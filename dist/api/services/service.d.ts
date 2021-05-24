import { HTTPMethod } from 'http-method-enum';
export declare abstract class Service {
    private _baseUrl;
    private readonly _accessToken?;
    constructor(id: string, region: string, stage: string, accessToken?: string);
    protected requestAsync(finalURL: string, method: HTTPMethod, body?: any): Promise<any>;
}
