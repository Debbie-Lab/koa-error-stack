import Koa from 'koa'
import errorStack from 'koa-error-stack'

const app = new Koa()
const es = errorStack({debug: true})
app.use(async (ctx, next) => {
  es.call(this, ctx, next)
})

app.use(ctx => {
  ctx.body = 'hello Koa'
})

app.listen(8011)
