import { HTTPMethod } from 'http-method-enum';


// export namespace API {

/**
 * @abstract
 * 
 * @summary Generic service, every single service class implements this
 */
export abstract class Service {

    private _baseUrl: string;

    private readonly _accessToken?: string;
    private readonly _idToken?: string;

    constructor(id: string, region: string, stage: string, accessToken?: string, idToken?: string) {
        this._baseUrl = `https://${id}.execute-api.${region}.amazonaws.com/${stage}}`;
        this._accessToken = accessToken;
        this._idToken = idToken;
    }

    /**
     * @async
     *
     * @summary Generic request to a Api Gateway Endpoint
     *
     * @param  {string} finalURL Url after domain
     * @param  {method} method Http request method
     * @param  {any} body Body of the request
     * @return {Promise<any>} Body of the response
     *
     * @throws Message of the failed request
     */
    protected async requestAsync(finalURL: string, method: HTTPMethod, body?: any):
        Promise<any> {

        const headers: HeadersInit = new Headers();
        headers.set('Content-Type', 'application/json');
        if (this._accessToken)
            headers.set('AccessToken', this._accessToken);
        if (this._idToken)
            headers.set('Authorization', this._idToken);

        const httpResponse = await fetch(`${this._baseUrl}/${finalURL}`, {
            method: method.toString(),
            headers: headers,
            body: body ? JSON.stringify(body) : null,
        });

        const jsonResponse = await httpResponse.json();

        if (jsonResponse.error) {
            throw new Error(jsonResponse.error);
        }

        return Promise.resolve(jsonResponse);
    }

}

// }