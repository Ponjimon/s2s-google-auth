"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodeFetch = require("node-fetch");
const querystring = require("querystring");
const getIdToken = (jwt) => nodeFetch
    .default('https://www.googleapis.com/oauth2/v4/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
    }),
})
    .then((res) => res.json());
exports.default = getIdToken;
//# sourceMappingURL=get-id-token.js.map