### Install
This package is not on `npm` yet. You have to install it using this GitHub repository.

### Usage
```javascript
import s2sGoogleAuth from 's2s-google-auth';

s2sGoogleAuth(clientId, clientEmail, privateKey).then(jwt => {
    console.log(jwt);
});
```