export interface IGoogleTokenResponse {
    id_token?: string;
    error?: string;
    error_description?: string;
}
declare const getIdToken: (jwt: string) => Promise<IGoogleTokenResponse>;
export default getIdToken;
