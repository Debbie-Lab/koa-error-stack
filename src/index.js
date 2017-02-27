import ErrorStackParser from 'error-stack-parser'

const style = `
<style>
  body { font-family: 'Andale Mono', monospace, sans-serif; font-size: 15px; line-height: 1.2em; background: aliceblue; }
  ul { list-style: none; margin: 5px; }
  .name { color: green; }
  .func { color: red; }
  .file { color: lightseagreen; }
  .line { color: blue; }
  .clum { color: brown; }
</style>
`

const errorStackTpl = (error) => {
  const errorStacks = ErrorStackParser.parse(error)
    .filter(stack => stack.fileName.indexOf('node_modules/babel') === -1)

  return (`
    <div>
      <div><span class="name">${error.name}</span>：${error.message}</div>
      <ul>` +
      errorStacks.map(stack => `
        <li> at
          <span class="func">${stack.functionName}</span>
          (<span class="file">${stack.fileName}</span>:<span class="line">${stack.lineNumber}</span>:<span class="clum">${stack.columnNumber}</span>)
      `) +
     `</ul>
    </div>`
  )
}

export default function(opts) {
  const debug = opts.debug

  return async function errorStack(ctx, next) {
    try {
      await next()
    } catch (e) {
      ctx.status = 500
      ctx.error = e
    }

    if (ctx.error) {
      const error = ctx.error
      const logger = ctx.logger || console
      if (error instanceof Error) {
        logger.error(error)
        if (debug) {
          ctx.type = 'text/html'
          ctx.body = `<!DOCTYPE html><html><head>${style}</head><body>${errorStackTpl(error)}</body>`
        } else {
          ctx.body = `${ctx.status}, Error Happens`
        }
      } else {
        logger.error(error.toString(), {type: 'error'})
        this.body = debug ? (error || 'error') + '' : `${ctx.status}, Error Happens`
      }
    }
  }
}