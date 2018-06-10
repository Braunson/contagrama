
const { Pool } = require('pg')

const pool = new Pool({
  database: process.env.CONTAGRAMA_DBNAME,
  user: process.env.CONTAGRAMA_DBUSER,
  host: process.env.CONTAGRAMA_DBHOST,
  password: process.env.CONTAGRAMA_DBPASS,
  port: process.env.CONTAGRAMA_DBPORT
})

class Model {
  static async getRow (query, params) {
    const result = await this.execute(query, params)
    if (result && result.rows.length) {
      return result.rows[0]
    }
  }
  static async getRows (query, params) {
    const result = await this.execute(query, params)
    if (result && result.rows) {
      return result.rows
    }
  }
  static async execute (query, params = []) {
    if (typeof query !== 'string' || !query.length) {
      throw new Error('* Model.execute() received an empty query')
    }
    const client = await pool.connect()
    return {
      client,
      result: await client.query(`${query};`, params)
    }
    // } finally {
    //   client.release()
    // }
  }
  static genUpdateQuery (where, payload) {
    let index
    const params = Object.values(payload)
      .concat(Object.values(where))
    payload = Object.keys(payload).map((key, i) => {
      index = i
      return `${key} = $${i}`
    })
    where = Object.keys(where).map((key, i) => {
      return `${key} = $${index + i}`
    })
    return {
      params,
      query: `${payload.join(', ')} where ${where.join(' and ')}`
    }
  }
}

exports.Food = class extends Model {
  static async list ({ page }) {
    if (isNaN(page)) {
      page = 1
    }
    return super.getRows(`select * from usda_foods limit 1000 offset ${(page - 1) * 1000}`)
  }
  static async get ({ id }) {
    return super.getRow(`select * from usda_foods where id = $1`, id)
  }
  static async update ({ id, payload }) {
    const updateQuery = super.genUpdateQuery({ id }, payload)
    return super.execute(`update usda_foods ${updateQuery}`)
  }
  static async delete ({ id }, payload) {
    return super.execute('delete from usda_foods where id = $1', [id])
  }
}
