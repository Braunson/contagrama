
const { Pool } = require('pg')
const { Model } = require('pgoose')

Model.debug = true

Model.client = new Pool({
  database: process.env.CONTAGRAMA_DBNAME,
  user: process.env.CONTAGRAMA_DBUSER,
  host: process.env.CONTAGRAMA_DBHOST,
  password: process.env.CONTAGRAMA_DBPASS,
  port: process.env.CONTAGRAMA_DBPORT
})

Model.updateRows2 = function (update, ids = {}) {
  const keys = Object.keys(ids)
  if (keys.length) {
    console.log('keys', keys)
    return Promise.all(keys.map((id) => {
      return this.updateRows(update, { id }, ids[id])
    }))
  } else {
    return Promise.reject(new Error('No conditions provided.'))
  }
}

Model.paginateRows = async function (select, where = null, page = 1, pageSize = 10) {
  let query
  if (this.checkParamObject(where)) {
    query = this.genWhereQuery(select, where)
    query.text = `${query.text} order by id limit ${pageSize} offset ${(page - 1) * pageSize}`
  } else {
    query = `${select} order by id limit ${pageSize} offset ${(page - 1) * pageSize}`
  }
  if (this.debug) {
    console.log(' * paginateRows() query:', query)
  }
  const { result } = await this.execute(query)
  return result.rows
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
  static async update ({ ids }) {
    await super.updateRows2('update usda_foods', ids)
    return { success: true }
    // } catch (err) {
    //   return { sucess: false }
    // }
  }
  static async remove ({ id }) {
    return super.deleteRows('delete from usda_foods', { id })
  }
}
