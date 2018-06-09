<template>
</template>

<script>
export default {
  asyncData ({ app, query }) {
    const payload = {
      page: query.page || 1
    }
    return {
      foods: await app.$axios.post('/api/food/list', )
    }
  }
}
</script>
