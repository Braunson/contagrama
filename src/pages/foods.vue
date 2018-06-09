<template>
</template>

<script>
export default {
  asyncData ({ app, query }) {
  	return {
      foods: await app.$axios.post('/api/food/list', { page: 1 })
  	}
  }
}
</script>
