require("babel-register")({
  presets: ['es2015', 'stage-3'],
  plugins: [
    ['module-alias',[
      { src: './src/index', 'expose': 'koa-error-stack' },
    ]],
  ],
})
require('babel-polyfill')

require('./error-stack')
