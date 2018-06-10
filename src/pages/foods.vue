<template>
  <div>
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
  </div>
</template>

<script>
export default {
  async asyncData ({ app, query }) {
    const payload = {
      page: query.page || 1
    }
    const foodsResponse = await app.$axios.post('food/list', payload)
    console.log('foodsResponse', foodsResponse)
    return {
      foods: foodsResponse.data.rows,
      totalPages: foodsResponse.data.total_pages
    }
  },
  methods: {
    async paginate (page) {
      const foodsResponse = await this.$axios.post('food/list', { page })
      this.foods = foodsResponse.data.rows
    }
  }
}
</script>

<style lang="scss">
body {
  font-family: sans-serif;
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
