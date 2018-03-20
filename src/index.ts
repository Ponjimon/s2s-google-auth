import encode from './encode';
import getIdToken from './get-id-token';

export default async function requestIdToken(
    clientId: string,
    clientEmail: string,
    key: string
): Promise<string> {
    const now = Date.now() / 1000;
    const jwt = encode(
        {
            iat: now,
            exp: now + 3600,
            iss: clientEmail,
            aud: 'https://www.googleapis.com/oauth2/v4/token',
            target_audience: clientId,
        },
        key,
        'RS256'
    );

    const result = await getIdToken(jwt);

    if ('error_description' in result) {
        throw new Error(result.error_description);
    }

    if (!('id_token' in result)) {
        throw new Error('Invalid result from google.');
    }

    return result.id_token;
}
