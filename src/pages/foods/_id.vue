<template>
  <div>
    <h2>{{ food.desc_long }}</h2>
    <div class="charts">
      <div class="chart">
        <div class="group" v-for="group in chart[0]">
          <div class="title">{{ group.title }}
            <table>
              <tr v-for="item in group.nutrients" v-if="nutrients[item[0]]">
                <td>{{ item[1] }}</td>
                <td class="amount">{{ nutrients[item[0]] }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="chart">
        <div class="group" v-for="group in chart[1]">
          <div class="title">{{ group.title }}
            <table>
              <tr v-for="item in group.nutrients" v-if="nutrients[item[0]]">
                <td>{{ item[1] }}</td>
                <td class="amount">{{ nutrients[item[0]] }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chart from '@/assets/nutrients.json'
export default {
  data: () => ({
    nutrients: {}
  }),
  async asyncData ({ app, params }) {
    const foodResponse = await app.$axios.post('foods/get', { id: params.id })
    const nutrientsResponse = await app.$axios.post('foods/get-nutrients', { id: params.id })
    console.log('nutrientsResponse', nutrientsResponse.data)
    return {
      chart,
      food: foodResponse.data,
      nutrients: nutrientsResponse.data
    }
  }
}
</script>

<style lang="scss">
html, body {
  margin: 10px;
  padding: 0px;
  font-family: sans-serif;
}
.charts {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.chart {
  background: #fff;
  width: 49%;
  .amount {
    color: #bf6c65;
    font-family: monospace;
    font-weight: bold;
    letter-spacing: -1.1px;
  }
  .group {
    padding: 10px 5px;
    padding-bottom: 1px;
    font-weight: bold;
    font-size: 16px;
    color: #bf6d65;
    background: #f5eded;
    margin-bottom: 20px;
  }
  table {
    background: #fff;
    color: #000;
    font-size: 14px;
    font-weight: normal;
    border-collapse: collapse;
    padding: 0px;
    width: 100%;
    margin-bottom: 10px;
  }
  table th {
    text-align: left;
  }
  .chart table td:first-child {
    padding-top: 5px;
    width: 80%;
  }
  table td:last-child {
    text-align: right;
    padding-right: 5px;
  }
  h2 {
    margin: 10px;
    font-size: 18px;
  }
  h3 {
    margin: 10px;
    font-size: 18px;
  }
}
</style>
