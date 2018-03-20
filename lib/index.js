'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('babel-polyfill');

var _encode = require('./encode');

var _encode2 = _interopRequireDefault(_encode);

var _getIdToken = require('./get-id-token');

var _getIdToken2 = _interopRequireDefault(_getIdToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var requestIdToken = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(clientId, clientEmail, key) {
        var now, jwt, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        now = Date.now() / 1000;
                        jwt = (0, _encode2.default)({
                            iat: now,
                            exp: now + 3600,
                            iss: clientEmail,
                            aud: 'https://www.googleapis.com/oauth2/v4/token',
                            target_audience: clientId
                        }, key, 'RS256');
                        _context.next = 4;
                        return (0, _getIdToken2.default)(jwt);

                    case 4:
                        result = _context.sent;

                        if (!(result && result.error && result.error_description)) {
                            _context.next = 7;
                            break;
                        }

                        throw new Error(result.error_description);

                    case 7:
                        if (!(!result || result && !result.id_token)) {
                            _context.next = 9;
                            break;
                        }

                        throw new Error('Invalid result from google.');

                    case 9:
                        return _context.abrupt('return', result.id_token);

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function requestIdToken(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = requestIdToken;