
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
  async execute (query) {
    let client
    try {
      client = pool.connect()
      return client.query(query)
    } finally {
      client.release()
    }
  }
}

class Food extends Model {
  static async list () {
    const result = await this.run('select * from usda_foods;')
    return result.rows
  }
  static async get (id) {
    const result = await this.run('select * from usda_foods;')
  }
}
