'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getIdToken = function getIdToken(jwt) {
    return (0, _nodeFetch2.default)('https://www.googleapis.com/oauth2/v4/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: _querystring2.default.stringify({
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: jwt
        })
    }).then(function (res) {
        return res.json();
    });
};

exports.default = getIdToken;