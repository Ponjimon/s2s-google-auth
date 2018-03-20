import fetch from 'node-fetch';
import qs from 'querystring';

const getIdToken = jwt =>
    fetch('https://www.googleapis.com/oauth2/v4/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify({
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: jwt,
        }),
    }).then(res => res.json());

export default getIdToken;
