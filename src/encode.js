import crypto from 'crypto';

export const base64UrlEscape = str =>
    str
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
export const base64UrlEncode = str =>
    base64UrlEscape(Buffer.from(str).toString('base64'));

export const signSegments = (input, key, method) => {
    const b64str = crypto
        .createSign(method)
        .update(input)
        .sign(key, 'base64');
    return base64UrlEscape(b64str);
};

const encode = (payload, key, algorithm = 'HS256') => {
    const header = {
        alg: algorithm,
        typ: 'JWT',
    };

    const algorithmMap = {
        HS256: 'sha256',
        HS384: 'sha384',
        HS512: 'sha512',
        RS256: 'RSA-SHA256',
    };

    const signingMethod = algorithmMap[algorithm];

    const segments = [
        base64UrlEncode(JSON.stringify(header)),
        base64UrlEncode(JSON.stringify(payload)),
    ];
    segments.push(signSegments(segments.join('.'), key, signingMethod));

    return segments.join('.');
};

export default encode;
