
const { Pool } = require('pg')
const { Model } = require('pgoose')

Model.client = new Pool({
  database: process.env.CONTAGRAMA_DBNAME,
  user: process.env.CONTAGRAMA_DBUSER,
  host: process.env.CONTAGRAMA_DBHOST,
  password: process.env.CONTAGRAMA_DBPASS,
  port: process.env.CONTAGRAMA_DBPORT
})

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
