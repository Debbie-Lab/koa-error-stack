import Koa from 'koa'
import errorStack, { errorStack2Html } from 'koa-error-stack'

const app = new Koa()
const es = errorStack({debug: true})
app.use(async (ctx, next) => {
  es.call(this, ctx, next)
})

app.use(ctx => {
  // throw new Error('hello, error-stack')
  // ctx.body = 'hello Koa'
  ctx.body = errorStack2Html(new Error('hello, errorStack2Html'))
})

app.listen(8011)
