
const plan = Vue.component('plan', {
  template: '#plan'
})

const chart = Vue.component('chart', {
  template: '#chart'
})

window.addEventListener('load', () => {
  return new Vue({
    el: '#app',
    data: {
      nutrients: window.NUTRIENTS
    },
    components: {
      plan: plan,
      chart: chart
    }
  })
})
