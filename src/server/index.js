
require('dotenv').config({path: 'contagrama.env'})

const {
  Koa,
  parse,
  multipartParse,
  Nuxt,
  Builder,
  config,
  models,
  translatePath
} = require('./support')

const app = new Koa()
app.proxy = true

const nuxt = new Nuxt(config)
config.dev = !(process.env.NODE_ENV === 'production')

if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(async (ctx, next) => {
  if (['GET', 'DELETE'].includes(ctx.request.method)) {
    await next()
  } else if (ctx.is('application/json')) {
    ctx.json = await parse.json(ctx)
    await next()
  } else if (ctx.is('multipart/*') === 'multipart/form-data') {
    ctx.parts = multipartParse(ctx, { autoFields: true })
    await next()
  } else {
    try {
      ctx.json = await parse.json(ctx)
    } catch (err) {
      ctx.json = null
    }
    await next()
  }
})

app.use(async (ctx, next) => {
  if (ctx.path.startsWith('/api') === false || ctx.request.method !== 'POST') {
    await next()
  } else {
    const apiMethod = ctx.path.split('/api/')[1]
    let [model, method] = apiMethod.split('/')
    model = translatePath(model)
      .replace(/^(.)(.*)/, (_, f, r) => `${f.toUpperCase()}${r}`)
    method = translatePath(method)
    ctx.body = await models[model][method](ctx.json)
  }
})

app.use(async (ctx, next) => {
  if (!ctx.request.path.startsWith('/api')) {
    await next()
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, (promise) => {
        promise.then(resolve).catch(reject)
      })
    })
  }
  await next()
})

app.listen(process.env.CONTAGRAMA_PORT || 3400)
