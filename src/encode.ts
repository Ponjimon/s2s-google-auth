import * as crypto from 'crypto';

interface IAlgorithmMap {
    [name: string]: string;
}

const algorithmMap: IAlgorithmMap = {
    HS256: 'sha256',
    HS384: 'sha384',
    HS512: 'sha512',
    RS256: 'RSA-SHA256',
};

export function base64UrlEscape(str: string): string {
    return str
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

export function base64UrlEncode(str: string): string {
    return base64UrlEscape(Buffer.from(str).toString('base64'));
}

export function signSegments(
    input: string,
    key: string,
    method: string
): string {
    const b64str = crypto
        .createSign(method)
        .update(input)
        .sign(key, 'base64');

    return base64UrlEscape(b64str);
}

export default function encode(
    payload: object,
    key: string,
    algorithm: string = 'HS256'
): string {
    if (
        typeof key !== 'string' ||
        (typeof key === 'string' && key.trim() === '')
    ) {
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
