export declare class Image {
    _path: string;
    _linkedItemId: string;
    _imageImportance: number;
    constructor(path: string, linkedItemId: string, imageImportance?: number);
    getExtension(): Promise<string>;
    getKey(): Promise<string>;
    getBucketLink(): Promise<string>;
}
