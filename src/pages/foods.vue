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
      background
      layout="prev, pager, next"
      :total="1000" />
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
  }
}
</script>

<style lang="scss">
table {
  font-family: sans-serif;
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
</style>
