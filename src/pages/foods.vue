<template>
  <div>
    <el-row :gutter="5" justify="start" class="top-bar">
      <el-col :span="4">
        <el-input v-model="searchField" placeholder="Filter foods" />
      </el-col>
      <el-col :span="2">
        <el-button>Filter</el-button>
      </el-col>
      <el-col :span="4">
        <el-select v-model="foodGroup" placeholder="Select food group">
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
        layout="prev, pager, next"
        :total="totalPages" />
    </el-row>
  </div>
</template>

<script>
export default {
  data: () => ({
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
  methods: {
    async paginate (page) {
      let filters = {}
      if (this.foodGroup) {
        filters.id_food_group = this.foodGroup
      }
      if (this.searchField) {
        filters.$like = {
          'desc_long': `%${this.searchField}%`
        }
      }
      const foodsResponse = await this.$axios.post('food/list', { filters, page })
      this.foods = foodsResponse.data.rows
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
