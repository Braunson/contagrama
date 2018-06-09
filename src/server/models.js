
import { Pool } from 'pg'

export const pool = new Pool({
  database: process.env.CONTAGRAMA_DBNAME,
  user: process.env.CONTAGRAMA_DBUSER,
  host: process.env.CONTAGRAMA_DBHOST,
  password: process.env.CONTAGRAMA_DBPASS,
  port: process.env.CONTAGRAMA_DBPORT
})

class Model {
  async getRow (query) {
    const result = await this.execute(query)
    if (result && result.rows.length) {
      return result.rows[0]
    }
  }
  async getRows (query) {
    const result = await this.execute(query)
    if (result && result.rows) {
      return result.rows
    }
  }
  async execute (query) {
    if (typeof query !== 'string' || !query.length) {
      throw new Error('* Model.execute() received an empty query')
    }
    let client
    try {
      client = pool.connect()
      return client.query(`${query};`)
    } finally {
      client.release()
    }
  }
}

class Food extends Model {
  static async list () {
    return this.getRows('select * from usda_foods')
  }
  static async get (id) {
    return this.getRow(`select * from usda_foods where id = ${id}`)
  }
}
