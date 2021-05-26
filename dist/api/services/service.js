"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
class Service {
    constructor(id, region, stage, accessToken, idToken) {
        this._baseUrl = `https://${id}.execute-api.${region}.amazonaws.com/${stage}}`;
        this._accessToken = accessToken;
        this._idToken = idToken;
    }
    requestAsync(finalURL, method, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = new Headers();
            headers.set('Content-Type', 'application/json');
            if (this._accessToken)
                headers.set('AccessToken', this._accessToken);
            if (this._idToken)
                headers.set('Authorization', this._idToken);
            const httpResponse = yield fetch(`${this._baseUrl}/${finalURL}`, {
                method: method.toString(),
                headers: headers,
                body: body ? JSON.stringify(body) : null,
            });
            const jsonResponse = yield httpResponse.json();
            if (jsonResponse.error) {
                throw new Error(jsonResponse.error);
            }
            return Promise.resolve(jsonResponse);
        });
    }
}
exports.Service = Service;
//# sourceMappingURL=service.js.map