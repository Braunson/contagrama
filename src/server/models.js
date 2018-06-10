
const { Pool } = require('pg')

const pool = new Pool({
  database: process.env.CONTAGRAMA_DBNAME,
  user: process.env.CONTAGRAMA_DBUSER,
  host: process.env.CONTAGRAMA_DBHOST,
  password: process.env.CONTAGRAMA_DBPASS,
  port: process.env.CONTAGRAMA_DBPORT
})

class Model {
  static async getRow (select, where = null) {
    if (where != null) {
      query = this.genWhereQuery(select, where)
    }
    const result = await this.execute(query)
    if (result && result.rows.length) {
      return result.rows[0]
    }
  }
  static async getRows (select, where = null) {
    const query = (where !== null)
      ? this.genWhereQuery(select, where)
      : select
    const { result } = await this.execute(query)
    if (result && result.rows) {
      return result.rows
    }
  }
  static async paginateRows (query, where = null, page = 1) {
    if (where) {
      query = 
    }
  }
  static async execute (query, ...params) {
    if (typeof query !== 'string' || !query.length) {
      throw new Error('* Model.execute() received an empty query')
    }
    let client
    try {
      client = await pool.connect()
      return {
        client,
        result: await client.query(`${query};`, params)
      }
    } finally {
      client.release()
    }
  }
  static genWhereQuery (select, where) {
    where = Object.keys(where).map((key, i) => {
      return `${key} = $${index + i}`
    })
    return {
      params: Object.values(where),
      query: `${select} where ${where.join(' and ')}`
    }
  }
  static genUpdateQuery (where, payload) {
    const values = [
      ...Object.values(payload),
      ...Object.values(where)
    ]
    payload = Object.keys(payload).map((key, i) => {
      return `${key} = $${i}`
    })
    const index = payload.length - 1
    where = Object.keys(where).map((key, i) => {
      return `${key} = $${index + i}`
    })
    return {
      values,
      text: `${payload.join(', ')} where ${where.join(' and ')}`
    }
  }
}

exports.Food = class extends Model {
  static async list ({ page }) {

    if (isNaN(page)) {
      page = 1
    }
    const rows = await super.getRows(`select * from usda_foods )
    return {
      rows,
      total: rows.length / 1000

    }
  }
  static async get ({ id }) {
    return super.getRow(`select * from usda_foods where id = $1`, id)
  }
  static async update ({ id, payload }) {
    const updateQuery = super.genUpdateQuery({ id }, payload)
    return super.execute(`update usda_foods ${updateQuery}`)
  }
  static async delete ({ id }, payload) {
    return super.execute('delete from usda_foods where id = $1', id)
  }
}
