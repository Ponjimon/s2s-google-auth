export interface IGoogleTokenResponse {
    id_token?: string;
    error?: string;
    error_description?: string;
}
export default function getIdToken(jwt: string): Promise<IGoogleTokenResponse>;
