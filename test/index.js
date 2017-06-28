const path = require('path')

require("babel-register")({
  presets: ['es2015', 'stage-3'],
  plugins: [
    ['module-alias',[
      { src: path.resolve(__dirname, '../src/index'), 'expose': 'koa-error-stack' },
    ]],
  ],
})
require('babel-polyfill')

require('./error-stack')
