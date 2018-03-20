"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const algorithmMap = {
    HS256: 'sha256',
    HS384: 'sha384',
    HS512: 'sha512',
    RS256: 'RSA-SHA256',
};
exports.base64UrlEscape = (str) => str
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
exports.base64UrlEncode = (str) => exports.base64UrlEscape(Buffer.from(str).toString('base64'));
exports.signSegments = (input, key, method) => {
    const b64str = crypto
        .createSign(method)
        .update(input)
        .sign(key, 'base64');
    return exports.base64UrlEscape(b64str);
};
const encode = (payload, key, algorithm = 'HS256') => {
    if (typeof key !== 'string' ||
        (typeof key === 'string' && key.trim() === '')) {
        throw new Error('A private key is required.');
    }
    const header = {
        alg: algorithm,
        typ: 'JWT',
    };
    if (!(algorithm in algorithmMap)) {
        throw new Error('Algorithm is not supported.');
    }
    const signingMethod = algorithmMap[algorithm];
    const segments = [
        exports.base64UrlEncode(JSON.stringify(header)),
        exports.base64UrlEncode(JSON.stringify(payload)),
    ];
    segments.push(exports.signSegments(segments.join('.'), key, signingMethod));
    return segments.join('.');
};
exports.default = encode;
//# sourceMappingURL=encode.js.map