<template>
  <div class="wrapper">
    <div class="ta-wrapper">
      <div class="help">
        click over the text area<br>
        or hit <b>cmd/ctrl+enter</b>
      </div>
      <textarea v-model="text"
        class="ta"
        autocomplete="off" 
        autocorrect="off" 
        autocapitalize="off" 
        spellcheck="false"
        @click="update">
      </textarea>
    </div>
    <div class="chart">
      <div class="group" v-for="group in chart">
        <div class="title">{{ group.title }}
          <table>
            <tbody>
              <tr v-for="item in group.nutrients">
                <td>{{ item[1] }}</td>
                <td class="amount">
                  {{ nutrients[item[0]] ? nutrients[item[0].toString()].toFixed(2) : '—' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chart from '@/assets/nutrients.json'
const FOOD_REGEX = /^\s*(\d+)g\s*(.+)/
export default {
  async asyncData () {
    return {
      chart: chart[0].concat(chart[1]),
      foods: null,
      text: '',
      nutrients: {}
    }
  },
  data () {
    return {
      chart: chart[0].concat(chart[1]),
      foods: null,
      text: '',
      nutrients: {}
    }
  },
  methods: {
    parse () {
      const lines = this.text.split('\n')
      const foods = []
      for (let i = 0, len = lines.length; i < len; i++) {
        const matchFood = lines[i].match(FOOD_REGEX)
        if (matchFood) {
          foods.push([matchFood[1], matchFood[2]])
        }
      }
      this.foods = foods
    },
    async update () {
      this.parse()
      const response = await this.$axios.post('foods/sum-nutrients', {
        foods: this.foods
      })
      this.nutrients = response.data
    }
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0px;
  padding: 0px;
}
.pb {
  font-size: 24px !important;
}
.wrapper {
  min-width: 1440px;
  width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-basis: auto;
  flex-grow: 1;
}
a {
  text-decoration: none;
}
b.mono {
  font-family: 'Fira Mono', monospace;
  background: #c3c3c3;
  padding: 2px;
}
.chart {
  margin-top: 40px;
  box-sizing: border-box;
  background: #fff;
  width: 29%;
  height: 100%;
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
.ta-wrapper {
  position: relative;
  box-sizing: border-box;
  width: 45%;
  .help {
    color: #555;
    position: absolute;
    font-size: 13px;
    font-family: sans-serif;
    width: 180px;
    height: 50px;
    top: 40px;
    right: 30px;
  }
  .ta {
    padding: 20px;
    padding-left: 100px;
    background: #f6f6f6;
    height: 100vh;
    width: calc(100% - 120px);
    overflow: scroll;
    font-family: 'Fira Mono', monospace;
    font-size: 20px;
    border: none;
    outline: none;
  }
}
</style>
