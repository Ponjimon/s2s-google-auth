"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const algorithmMap = {
    HS256: 'sha256',
    HS384: 'sha384',
    HS512: 'sha512',
    RS256: 'RSA-SHA256',
};
function base64UrlEscape(str) {
    return str
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
exports.base64UrlEscape = base64UrlEscape;
function base64UrlEncode(str) {
    return base64UrlEscape(Buffer.from(str).toString('base64'));
}
exports.base64UrlEncode = base64UrlEncode;
function signSegments(input, key, method) {
    const b64str = crypto
        .createSign(method)
        .update(input)
        .sign(key, 'base64');
    return base64UrlEscape(b64str);
}
exports.signSegments = signSegments;
function encode(payload, key, algorithm = 'HS256') {
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
        base64UrlEncode(JSON.stringify(header)),
        base64UrlEncode(JSON.stringify(payload)),
    ];
    segments.push(signSegments(segments.join('.'), key, signingMethod));
    return segments.join('.');
}
exports.encode = encode;
//# sourceMappingURL=encode.js.map