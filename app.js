
window.addEventListener('load', () => {
  console.log('!')
  return new Vue({
    el: '#app',
    data: {
      nutrients: window.NUTRIENTS
    }
  })
})
