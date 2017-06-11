
const plan = Vue.component('plan', {
  template: '#plan'
})

const chart = Vue.component('chart', {
  template: '#chart',
  props: {
    nutrients: {
      type: Array,
      required: false
    }
  }
  computed: {
    chart () {
      return window.NUTRIENTS.map((group) => {
        return {title: group[0], data: group.slice(1)}
      })
    }
  }
})

const app = () => new Vue({
  el: '#app',
  components: {
    plan,
    chart
  }
})

window.addEventListener('load', () => app())
