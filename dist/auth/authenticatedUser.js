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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedUser = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
class AuthenticatedUser {
    constructor() {
        this._provider = new aws_sdk_1.default.CognitoIdentityServiceProvider({
            apiVersion: 'latest'
        });
    }
    static fromToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = new AuthenticatedUser();
            res._userId = (yield res._provider
                .getUser({
                AccessToken: token
            }).promise())
                .Username;
            return Promise.resolve(res);
        });
    }
    getUserId() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(this._userId);
        });
    }
    isVendor(userPoolId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let groupList = yield this._provider.adminListGroupsForUser({
                Username: this._userId,
                UserPoolId: userPoolId
            }).promise();
            return Promise.resolve(((_a = groupList.Groups) === null || _a === void 0 ? void 0 : _a.find(x => x.GroupName == "Vendor")) ? true : false);
        });
    }
}
exports.AuthenticatedUser = AuthenticatedUser;
//# sourceMappingURL=authenticatedUser.js.map