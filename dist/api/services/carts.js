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
exports.Carts = void 0;
const service_1 = require("./service");
const http_method_enum_1 = require("http-method-enum");
class Carts extends service_1.Service {
    constructor(id, region, stage, accessToken) {
        super(id, region, stage, accessToken);
        this._finalUrl = 'cart';
    }
    getAsync() {
        const _super = Object.create(null, {
            requestAsync: { get: () => super.requestAsync }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const method = http_method_enum_1.HTTPMethod.GET;
            return Promise.resolve(yield _super.requestAsync.call(this, this._finalUrl, method));
        });
    }
}
exports.Carts = Carts;
//# sourceMappingURL=carts.js.map