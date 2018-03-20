export declare const base64UrlEscape: (str: string) => string;
export declare const base64UrlEncode: (str: string) => string;
export declare const signSegments: (input: string, key: string, method: string) => string;
declare const encode: (payload: object, key: string, algorithm?: string) => string;
export default encode;
