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
    </el-row>
    <el-row>
      <el-table :data="foods">
        <el-table-column
          prop="id"
          label="ID"
          width="100" />
        <el-table-column
          prop="desc_long"
          label="Description" />
      </el-table>
      <el-pagination
        @current-change="paginate"
        background
        layout="total, prev, pager, next"
        :page-count="totalPages" />
    </el-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    page: 1,
    foodGroup: null,
    searchField: ''
  }),
  async asyncData ({ app, query }) {
    const payload = {
      page: query.page || 1
    }
    const foodsResponse = await app.$axios.post('foods/paginate', payload)
    const foodGroupsResponse = await app.$axios.post('food-groups/list', payload)
    return {
      foods: foodsResponse.data.rows,
      foodGroups: foodGroupsResponse.data,
      totalPages: foodsResponse.data.total_pages
    }
  },
  watch: {
    foodGroup () {
      this.paginate(1)
    }
  },
  methods: {
    async paginate (page) {
      let filters = {}
      if (this.foodGroup) {
        filters.id_food_group = this.foodGroup
      }
      if (this.searchField) {
        filters.$ilike = {
          'desc_long': `%${this.searchField}%`
        }
      }
      const foodsResponse = await this.$axios.post('foods/paginate', { filters, page })
      this.foods = foodsResponse.data.rows
      this.totalPages = foodsResponse.data.total_pages
      this.$forceUpdate()
      this.page = page
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
  .el-select {
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
