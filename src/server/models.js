
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
    const query = this.checkParamObject(where)
      ? this.genWhereQuery(select, where)
      : select
    const { result } = await this.execute(query)
    if (result.rows.length) {
      return result.rows[0]
    }
  }
  static async getRows (select, where = null) {
    const query = this.checkParamObject(where)
      ? this.genWhereQuery(select, where)
      : select
    const { result } = await this.execute(query)
    if (result && result.rows) {
      return result.rows
    }
  }
  static async paginateRows (select, where = null, page = 1, pageSize = 10) {
    let query
    if (this.checkParamObject(where)) {
      query = this.genWhereQuery(select, where)
      query.text = `${query.text} limit ${pageSize} offset ${(page - 1) * pageSize}`
    } else {
      query = `${select} limit ${pageSize} offset ${(page - 1) * pageSize}`
    }
    const { result } = await this.execute(query)
    return result.rows
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
  static async updateRows (update, where, payload) {
    const values = [
      ...Object.values(payload),
      ...Object.values(where)
    ]
    payload = Object.keys(payload).map((key, i) => {
      return `${key} = $${i + 1}`
    })
    const index = payload.length
    where = Object.keys(where).map((key, i) => {
      return `${key} = $${index + (i + 1)}`
    })
    const query = {
      values,
      text: `${update} ${payload.join(', ')} where ${where.join(' and ')}`
    }
    const { result } = await this.execute(query) 
    console.log(' * Model.updateRows() result:', result)
  }
  static async deleteRows (deleteQ, where) {
    const query = this.genWhereQuery(deleteQ, where)
    const { result } = await this.execute(query)
    console.log(' * Model.deleteRows() result:', result)
  }
  static checkParamObject (obj) {
    return (
      obj !== null &&
      typeof obj === 'object' &&
      Object.keys(obj).length > 0
    )
  }
  static genWhereQuery (query, where) {
    let index = 1
    const values = []
    where = Object.keys(where).reduce((arr, key) => {
      if (key === '$like') {
        return arr.concat(Object.keys(where[key]).map((subkey) => {
          values.push(where[key][subkey])
          return `${subkey} like ${index++}`
        })
      } else {
        values.push(where[key])
        arr.push(`${key} = $${index++}`)
        return arr
      }
    }, [])
    const text = `${query} where ${where.join(' and ')}`
    return { values, text }
  }
}

exports.FoodGroups = class extends Model {
  static async list () {
    return super.getRows('select * from usda_food_groups')
  }
}

exports.Foods = class extends Model {
  static async paginate ({ page, filters, pageSize = 10 }) {
    const totalRows = await super.getRow('select count(*) from usda_foods', filters)
    const paginatedRows = await super.paginateRows('select * from usda_foods', filters, page, pageSize)
    return {
      rows: paginatedRows,
      total_pages: Math.ceil(totalRows.count / pageSize)
    }
  }
  static async get ({ id }) {
    return super.getRow(`select * from usda_foods`, { id })
  }
  static async update ({ id, payload }) {
    return super.updateRows('update usda_foods', { id }, payload)
  }
  static async remove ({ id }) {
    return super.deleteRows('delete from usda_foods', { id })
  }
}
