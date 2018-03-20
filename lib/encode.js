'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.signSegments = exports.base64UrlEncode = exports.base64UrlEscape = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var base64UrlEscape = exports.base64UrlEscape = function base64UrlEscape(str) {
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};
var base64UrlEncode = exports.base64UrlEncode = function base64UrlEncode(str) {
    return base64UrlEscape(Buffer.from(str).toString('base64'));
};

var signSegments = exports.signSegments = function signSegments(input, key, method) {
    var b64str = _crypto2.default.createSign(method).update(input).sign(key, 'base64');
    return base64UrlEscape(b64str);
};

var encode = function encode(payload, key) {
    var algorithm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'HS256';

    var header = {
        alg: algorithm,
        typ: 'JWT'
    };

    var algorithmMap = {
        HS256: 'sha256',
        HS384: 'sha384',
        HS512: 'sha512',
        RS256: 'RSA-SHA256'
    };

    var signingMethod = algorithmMap[algorithm];

    var segments = [base64UrlEncode(JSON.stringify(header)), base64UrlEncode(JSON.stringify(payload))];
    segments.push(signSegments(segments.join('.'), key, signingMethod));

    return segments.join('.');
};

exports.default = encode;