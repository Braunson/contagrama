<template>
  <el-table
    :data="foods"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="100" />
    <el-table-column
      prop="desc_long"
      label="Description" />
  </el-table>
</template>

<script>
export default {
  async asyncData ({ app, query }) {
    const payload = {
      page: query.page || 1
    }
    const foodsR = await app.$axios.post('food/list', payload)
    return { foods: foodsR.data }
  }
}
</script>

<style>
html, body, table {
  width: 100%;
}
</style>
