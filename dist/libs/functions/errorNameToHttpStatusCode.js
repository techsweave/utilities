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
exports.errorNameToHttpStatusCode = void 0;
const http_status_codes_1 = require("http-status-codes");
const errorNameToHttpStatusCode = (error) => __awaiter(void 0, void 0, void 0, function* () {
    let code;
    switch (error.name) {
        case 'ItemNotFoundException':
            code = http_status_codes_1.StatusCodes.NOT_FOUND;
            break;
        default:
            code = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
            break;
    }
    return Promise.resolve(code);
});
exports.errorNameToHttpStatusCode = errorNameToHttpStatusCode;
//# sourceMappingURL=errorNameToHttpStatusCode.js.map