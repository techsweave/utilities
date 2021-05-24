"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middyfy = void 0;
const core_1 = __importDefault(require("@middy/core"));
const http_json_body_parser_1 = __importDefault(require("@middy/http-json-body-parser"));
const middyfy = (handler) => {
    return core_1.default(handler).use(http_json_body_parser_1.default());
};
exports.middyfy = middyfy;
//# sourceMappingURL=lambda.js.map