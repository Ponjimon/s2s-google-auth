### Install
`yarn add s2s-google-auth`

or

`npm install --save s2s-google-auth`

### Usage
```javascript
import { requestIdToken } from 's2s-google-auth';

requestIdToken(clientId, clientEmail, privateKey).then(jwt => {
    console.log(jwt);
});
```