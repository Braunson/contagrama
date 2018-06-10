
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
  static async paginateRows (select, where = null, page = 1, pageSize = 10000) {
    if (where !== null) {
      query = this.genWhereQuery(select, where)
      query.text = `${query.text} limit ${pageSize} offset ${(page - 1) * pageSize}`
    } else {
      query = `${select} limit ${pageSize} offset ${(page - 1) * pageSize}`
    }
    const { result } = await this.execute(query)
    return {
      rows: result.rows,
      total_pages: Math.ceil(result.rows.length / pageSize)
    }
  }
  static async execute (query, ...params) {
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
      values: Object.values(where),
      text: `${select} where ${where.join(' and ')}`
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
    return super.paginateRows('select * from usda_foods', null, page)
  }
  static async get ({ id }) {
    return super.getRow(`select * from usda_foods`, { id })
  }
  static async update ({ id, payload }) {
    const updateQuery = super.genUpdateQuery({ id }, payload)
    return super.execute(`update usda_foods ${updateQuery}`)
  }
  static async delete ({ id }, payload) {
    return super.execute('delete from usda_foods where id = $1', id)
  }
}
