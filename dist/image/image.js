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
exports.Image = void 0;
class Image {
    constructor(path, linkedItemId, imageImportance = 1) {
        this._path = path;
        this._linkedItemId = linkedItemId;
        this._imageImportance = imageImportance;
    }
    getExtension() {
        return __awaiter(this, void 0, void 0, function* () {
            const r = this._path.split('.');
            return r[r.length - 1];
        });
    }
    getKey() {
        return __awaiter(this, void 0, void 0, function* () {
            return `${this._linkedItemId}/image${this._imageImportance}.${this.getExtension()}`;
        });
    }
    getBucketLink() {
        return __awaiter(this, void 0, void 0, function* () {
            return `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${this.getKey()}`;
        });
    }
}
exports.Image = Image;
;
//# sourceMappingURL=image.js.map