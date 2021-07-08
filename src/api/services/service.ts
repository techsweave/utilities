import { Method } from 'axios';
import axios from 'axios';

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
        this._baseUrl = `https://${id}.execute-api.${region}.amazonaws.com/${stage}`;
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
    protected async requestAsync(finalURL: string, method: Method, body?: any): Promise<any> {

        const headers = {
            'Content-Type': 'application/json',
            'accesstoken': this._accessToken ? this._accessToken : null,
            'Authorization': this._idToken ? this._idToken : null,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        };

        let axiosResponse;
        try {
            axiosResponse = await axios.request({
                url: `${this._baseUrl}/${finalURL}`,
                headers: headers,
                method: method,
                data: body ? body : null
            });

        } catch (err) {
            if (err.response) {
                throw err.response.data;
            } else if (err.request) {
                throw err.request;
            } else {
                throw err;
            }
        }

        if (axiosResponse.data.count == 1)
            return Promise.resolve(axiosResponse.data.data);

        return Promise.resolve(axiosResponse.data);
    }
}
