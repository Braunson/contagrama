<template>
  <el-table
    :data="foods"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="180" />
    <el-table-column
      prop="long_desc"
      label="Description"
      width="180" />
  </el-table>
</template>

<script>
export default {
  asyncData ({ app, query }) {
    const payload = {
      page: query.page || 1
    }
    return {
      foods: await app.$axios.post('food/list', payload)
    }
  }
}
</script>
