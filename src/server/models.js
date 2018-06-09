
const { Pool } = require('pg')

export const pool = new Pool({
  database: process.env.CONTAGRAMA_DBNAME,
  user: process.env.CONTAGRAMA_DBUSER,
  host: process.env.CONTAGRAMA_DBHOST,
  password: process.env.CONTAGRAMA_DBPASS,
  port: process.env.CONTAGRAMA_DBPORT
})

class Model {
  async getRow (query, params = []) {
    const result = await this.execute(query, params)
    if (result && result.rows.length) {
      return result.rows[0]
    }
  }
  async getRows (query, params = []) {
    const result = await this.execute(query, params)
    if (result && result.rows) {
      return result.rows
    }
  }
  static async execute (query, params = []) {
    if (typeof query !== 'string' || !query.length) {
      throw new Error('* Model.execute() received an empty query')
    }
    let client
    try {
      client = pool.connect()
      return {
        client,
        result: await client.query(`${query};`, params)
      }
    } finally {
      client.release()
    }
  }
  genUpdateQuery (where, payload) {
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

export class Food extends Model {
  static async list (page = 1) {
    return super.getRows(`select * from usda_foods limit ${(page - 1) * 1000}, 1000`)
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
