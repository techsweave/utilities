import { HTTPMethod } from 'http-method-enum';
export declare abstract class Service {
    private _baseUrl;
    private readonly _accessToken?;
    private readonly _idToken?;
    constructor(id: string, region: string, stage: string, accessToken?: string, idToken?: string);
    protected requestAsync(finalURL: string, method: HTTPMethod, body?: any): Promise<any>;
}
