import 'babel-polyfill';
import encode from './encode';
import getIdToken from './get-id-token';

const requestIdToken = async (clientId, clientEmail, key) => {
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

    if (result && result.error && result.error_description) {
        throw new Error(result.error_description);
    }

    if (!result || (result && !result.id_token)) {
        throw new Error('Invalid result from google.');
    }

    return result.id_token;
};

export default requestIdToken;
