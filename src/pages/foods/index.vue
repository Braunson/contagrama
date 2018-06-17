<template>
  <div>
    <el-row :gutter="5" justify="start" class="top-bar">
      <el-col :span="4">
        <el-input v-model="searchField" placeholder="Filter foods" />
      </el-col>
      <el-col :span="2">
        <el-button @click="paginate(page)">Filter</el-button>
      </el-col>
      <el-col :span="4">
        <el-select
          v-model="foodGroup" placeholder="Select food group">
          <el-option
            v-for="fg in foodGroups"
            :key="`food-group-${fg.id}`"
            :label="fg.desc"
            :value="fg.id" />
        </el-select>
      </el-col>
      <el-col :span="2" v-show="changesMade">
        <el-button :loading="updating" type="success" @click="update">Save</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="foods">
        <el-table-column
          prop="id"
          label="ID"
          width="100" />
        <el-table-column
          prop="cg_terms"
          label="Contagrama"
          width="350">
          <template slot-scope="scope">
            <el-input v-model="termsHash[scope.row.id]" />
          </template>
        </el-table-column>
        <el-table-column
          prop="desc_long"
          label="Description">
          <template slot-scope="scope">
            <nuxt-link :to="`/foods/${scope.row.id}`">{{ scope.row.desc_long }}</nuxt-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="paginate"
        :current-page="page"
        background
        layout="total, prev, pager, next"
        :page-count="totalPages" />
    </el-row>
  </div>
</template>

<script>
const genTermsHash = (foods) => {
  return foods.reduce((obj, food) => {
    return { ...obj, [food.id]: (food.cg_terms || '') }
  }, {})
}
export default {
  data: () => ({
    page: 1,
    updating: false,
    foodGroup: null,
    termsHash: {},
    termsHashOrig: {},
    searchField: ''
  }),
  async asyncData ({ app, query, params }) {
    const payload = {
      filters: {},
      page: query.p || 1
    }
    if (query.fg) {
      payload.filters['id_food_group'] = query.fg
    }
    if (query.q) {
      payload.filters.$ilike = { 'desc_long': `%${query.q}%` }
    }
    const foodsResponse = await app.$axios.post('foods/paginate', payload)
    const foodGroupsResponse = await app.$axios.post('food-groups/list')
    return {
      foods: foodsResponse.data.rows,
      termsHashOrig: genTermsHash(foodsResponse.data.rows),
      termsHash: genTermsHash(foodsResponse.data.rows),
      foodGroups: foodGroupsResponse.data,
      totalPages: foodsResponse.data.total_pages
    }
  },
  watch: {
    foodGroup () {
      this.paginate(1)
    }
  },
  computed: {
    changesMade () {
      const ids = Object.keys(this.termsHash)
      for (let i = 0, len = ids.length; i < len; i++) {
        if (this.termsHash[ids[i]] !== this.termsHashOrig[ids[i]]) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    encodeParams (obj) {
      return Object.keys(obj).reduce((a, k) => {
        a.push(`${k}=${encodeURIComponent(obj[k])}`)
        return a
      }, []).join('&')
    },
    updatePath () {
      const { origin, pathname } = window.location
      const qs = {}
      if (this.page !== 1) {
        qs.p = this.page
      }
      if (this.searchField.length) {
        qs.q = this.searchField
      }
      if (this.foodGroup) {
        qs.fg = this.foodGroup
      }
      const newPath = `${origin}${pathname}?${this.encodeParams(qs)}`
      window.history.replaceState({ path: newPath }, '', newPath)
    },
    async update () {
      this.updating = true
      const ids = Object.keys(this.termsHash).reduce((obj, id) => {
        if (this.termsHash[id] !== this.termsHashOrig[id]) {
          // console.log('this.termsHash[id]', this.termsHash[id])
          return { ...obj, [id]: { 'cg_terms': this.termsHash[id] } }
        } else {
          return obj
        }
      }, {})
      await this.$axios.post('/foods/update', { ids })
      this.updating = false
    },
    async paginate (page) {
      let filters = {}
      let qs = {}
      if (this.foodGroup) {
        filters.id_food_group = this.foodGroup
        qs.fg = this.foodGroup
      }
      if (this.searchField) {
        filters.$ilike = {
          'desc_long': `%${this.searchField}%`
        }
        qs.q = this.searchField
      }
      const foodsResponse = await this.$axios.post('foods/paginate', { filters, page })
      this.foods = foodsResponse.data.rows
      this.termsHashOrig = genTermsHash(this.foods)
      this.termsHash = genTermsHash(foodsResponse.data.rows)
      this.totalPages = foodsResponse.data.total_pages
      this.page = page
      this.updatePath()
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss">
body {
  font-family: sans-serif;
}
.top-bar {
  margin-bottom: 10px;
  .el-select select {
    width: 300px;
  }
}
table {
  width: 100%;
  td, th {
    padding: 5px;
  }
  thead tr {
    text-align: left;
  }
  tbody tr {
    text-align: left;
    background-color: #f2f2f2;
    &:nth-child(even) {
      background-color: #fff;
    }
  }
}
.el-pagination {
  padding-left: 0px;
  padding-right: 0px;
  margin-top: 10px;
}
</style>
