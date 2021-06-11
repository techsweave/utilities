export class Image {
    _path: string;
    _linkedItemId: string;

    private constructor(path: string, linkedItemId: string) {
        this._path = path;
        this._linkedItemId = linkedItemId;
    }


    /**
     * @async
     * 
     * @param path the local path of the image to create
     * @param linkedItemId the id of the item that refers to this image
     * 
     * @returns {Promise<Image>} new Image
     */
    async createImageFromPath(path: string, linkedItemId: string): Promise<Image> {
        return new Image(path, linkedItemId);
    }

    /**
     * @async
     * 
     * @param url the url of the image in s3: https://bucketName.s3.region.amazonaws.com/itemid.extension
     * 
     * @returns {Promise<Image>} new Image
     */
    async createImageFromS3Url(url: string): Promise<Image> {

        const pathElements = url.split('/');
        const path = pathElements[pathElements.length - 1];
        const a = path.split('.');
        const itemId = a[0];
        return new Image(path, itemId);
    }

    /**
     * @async
     *
     * @summary get the image extension
     *
     * @return {Promise<string>} the image extension
     */
    private async getExtension(): Promise<string> {
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
        return `${this._linkedItemId}.${this.getExtension()}`;
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

}