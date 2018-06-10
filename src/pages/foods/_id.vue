<template>
  <div>
    <h2>{{ food.desc_long }}</h2>
    <div class="charts">
      <div class="chart">
        <div class="group" v-for="group in chart[0]">
          <div class="title">{{ group.title }}
            <table>
              <tr v-for="item in group.nutrients">
                <td>{{ item }}</td>
                <td>xxx</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="chart">
        <div class="group" v-for="group in chart[1]">
          <div class="title">{{ group.title }}
            <table>
              <tr v-for="item in group.nutrients">
                <td>{{ item }}</td>
                <td>xxx</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import nutrients from '@/assets/nutrients.json'
export default {
  async asyncData ({ app, params }) {
    const foodResponse = await app.$axios.post('foods/get', { id: params.id })
    return { food: foodResponse.data, chart: nutrients }
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
