export interface IGoogleTokenResponse {
    id_token?: string;
    error?: string;
    error_description?: string;
}
export declare function getIdToken(jwt: string): Promise<IGoogleTokenResponse>;
