### Install
`yarn add s2s-google-auth`

or

`npm install --save s2s-google-auth`

### Usage
```javascript
import { requestTokenId } from 's2s-google-auth';

requestTokenId(clientId, clientEmail, privateKey).then(jwt => {
    console.log(jwt);
});
```