"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const encode_1 = require("./encode");
const get_id_token_1 = require("./get-id-token");
const requestIdToken = (clientId, clientEmail, key) => __awaiter(this, void 0, void 0, function* () {
    const now = Date.now() / 1000;
    const jwt = encode_1.default({
        iat: now,
        exp: now + 3600,
        iss: clientEmail,
        aud: 'https://www.googleapis.com/oauth2/v4/token',
        target_audience: clientId,
    }, key, 'RS256');
    const result = yield get_id_token_1.default(jwt);
    if ('error_description' in result) {
        throw new Error(result.error_description);
    }
    if (!('id_token' in result)) {
        throw new Error('Invalid result from google.');
    }
    return result.id_token;
});
exports.default = requestIdToken;
//# sourceMappingURL=index.js.map