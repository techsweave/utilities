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
exports.Response = void 0;
const errorNameToHttpStatusCode_1 = require("../libs/functions/errorNameToHttpStatusCode");
class Response {
    constructor() {
        this._data = [];
    }
    static fromMultipleData(data, statusCode, lastEvaluatedKey) {
        if (statusCode < 200 || statusCode >= 300) {
            throw new Error('If a response has data, the status code must be between 200 and 299');
        }
        const res = new Response();
        res._data = data;
        res._statusCode = statusCode;
        res._lastEvaluatedKey = lastEvaluatedKey;
        return res;
    }
    static fromData(data, statusCode) {
        if (statusCode < 200 || statusCode >= 300) {
            throw new Error('If a response has data, the status code must be between 200 and 299');
        }
        const res = new Response();
        res._data[0] = data;
        res._statusCode = statusCode;
        return res;
    }
    static fromError(error) {
        const res = new Response();
        res._error = error;
        return res;
    }
    hasData() {
        var _a;
        return ((_a = this._data) === null || _a === void 0 ? void 0 : _a.length) != 0;
    }
    addPage(data, lastEvaluatedKey) {
        if (this.hasData()) {
            this._data = this._data.concat(data);
            this._lastEvaluatedKey = lastEvaluatedKey;
        }
    }
    toAPIGatewayProxyResult() {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const response = {
                statusCode: this._statusCode,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: null
            };
            if (this._error != null) {
                this._data = undefined;
                this._statusCode = (_a = this._error) === null || _a === void 0 ? void 0 : _a.statusCode;
                if (this._statusCode == null) {
                    this._statusCode = yield errorNameToHttpStatusCode_1.errorNameToHttpStatusCode(this._error);
                }
                response.body = JSON.stringify({
                    error: {
                        name: (_b = this._error) === null || _b === void 0 ? void 0 : _b.name,
                        message: (_c = this._error) === null || _c === void 0 ? void 0 : _c.message
                    }
                });
            }
            else if (((_d = this._data) === null || _d === void 0 ? void 0 : _d.length) == 1) {
                response.body = JSON.stringify({
                    data: this._data[0],
                    count: 1,
                    lastEvaluatedKey: this._lastEvaluatedKey
                });
            }
            else {
                response.body = JSON.stringify({
                    data: this._data,
                    count: (_e = this._data) === null || _e === void 0 ? void 0 : _e.length,
                    lastEvaluatedKey: this._lastEvaluatedKey
                });
            }
            return Promise.resolve(response);
        });
    }
}
exports.Response = Response;
//# sourceMappingURL=lambdaResponse.js.map