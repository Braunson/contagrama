
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
    const query = (where != null)
      ? this.genWhereQuery(select, where)
      : select
    const result = await this.execute(query)
    if (result.rows.length) {
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
  static async execute (query) {
    let client
    try {
      client = await pool.connect()
      return {
        client,
        result: await client.query(query)
      }
    } catch (err) {
      console.log(' * Model.execute() failed:', err)
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
  static updateRows (update, where, payload) {
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
    const query = {
      values,
      text: `${update} ${payload.join(', ')} where ${where.join(' and ')}`
    }
    await this.execute(query)
  }
}

exports.Food = class extends Model {
  static async list ({ page, filters }) {
    return super.paginateRows('select * from usda_foods', filters, page)
  }
  static async get ({ id }) {
    return super.getRow(`select * from usda_foods`, { id })
  }
  static async update ({ id, payload }) {
    return super.updateRows('update usda_foods', { id }, payload)
  }
  static async delete ({ id }, payload) {
    return super.deleteRows('delete from usda_foods', { id })
  }
}
