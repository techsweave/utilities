export class Image {
    _path: string;
    _linkedItemId: string;
    _imageImportance: number;

    constructor(path: string, linkedItemId: string, imageImportance = 1) {
        this._path = path;
        this._linkedItemId = linkedItemId;
        this._imageImportance = imageImportance;
    }

    /**
     * @async
     *
     * @summary get the image extension
     *
     * @return {Promise<string>} the image extension
     */
    async getExtension(): Promise<string> {
        const r = this._path.split('.');
        return r[r.length - 1];
    }

    /**
     * @async
     *
     * @summary get the image key for the s3 bucket, showing the location in the service
     *
     * @return {Promise<string>} the image s3 key
     */
    async getKey(): Promise<string> {
        return `${this._linkedItemId}/image${this._imageImportance}.${this.getExtension()}`;
    }

    /**
     * @async
     *
     * @summary get the image link
     *
     * @return {Promise<string>} the image link, stored in s3 service
     */
    async getBucketLink(): Promise<string> {
        return `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${this.getKey()}`;
    }

};