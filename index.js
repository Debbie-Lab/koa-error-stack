'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorStack2Html = exports.errorStackTpl = undefined;

exports.default = function (opts) {
  var debug = opts.debug;

  return function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
      var error, logger;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return next();

            case 3:
              _context.next = 9;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context['catch'](0);

              ctx.status = 500;
              ctx.error = _context.t0;

            case 9:

              if (ctx.error) {
                error = ctx.error;
                logger = ctx.logger || console;

                if (error instanceof Error) {
                  logger.error(error);
                  if (debug) {
                    ctx.type = 'text/html';
                    ctx.body = errorStack2Html(error);
                  } else {
                    ctx.body = ctx.status + ', Error Happens';
                  }
                } else {
                  logger.error(error.toString(), { type: 'error' });
                  this.body = debug ? (error || 'error') + '' : ctx.status + ', Error Happens';
                }
              }

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 5]]);
    }));

    function errorStack(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return errorStack;
  }();
};

var _errorStackParser = require('error-stack-parser');

var _errorStackParser2 = _interopRequireDefault(_errorStackParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var meta = '\n<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">\n';

var style = '\n<style>\n  body { font-family: \'Andale Mono\', monospace, sans-serif; font-size: 15px; line-height: 1.2em; background: aliceblue; }\n  ul { list-style: none; margin: 5px; }\n  .name { color: green; }\n  .func { color: red; }\n  .file { color: lightseagreen; }\n  .line { color: blue; }\n  .clum { color: brown; }\n</style>\n';

var errorStackTpl = exports.errorStackTpl = function errorStackTpl(error) {
  var errorStacks = _errorStackParser2.default.parse(error).filter(function (stack) {
    return stack.fileName.indexOf('node_modules/babel') === -1;
  });

  return '\n    <div>\n      <div><span class="name">' + error.name + '</span>\uFF1A' + error.message + '</div>\n      <ul>' + errorStacks.map(function (stack) {
    return '\n        <li> at\n          <span class="func">' + stack.functionName + '</span>\n          (<span class="file">' + stack.fileName + '</span>:<span class="line">' + stack.lineNumber + '</span>:<span class="clum">' + stack.columnNumber + '</span>)\n      ';
  }) + '</ul>\n    </div>';
};

var errorStack2Html = exports.errorStack2Html = function errorStack2Html(error) {
  return '<!DOCTYPE html><html><head>' + meta + style + '</head><body>' + errorStackTpl(error) + '</body>';
};
