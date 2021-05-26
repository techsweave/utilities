import { Service } from './service'
import { HTTPMethod } from 'http-method-enum'
import { MultipleDataBody } from '../models/lambdaBody'
import { Cart } from '../models/database/carts';

/**
 * @summary Cart service
 */
export class Carts extends Service {

    private readonly _finalUrl: string;

    constructor(id: string, region: string, stage: string, accessToken?: string, idToken?: string) {
        super(id, region, stage, accessToken, idToken);
        this._finalUrl = 'cart';
    }

    /**
     * @async
     *
     * @summary Request to the endpoint of get cart
     *
     * @return {Promise<MultipleDataBody<Cart>>}
     * Return an array of carts, count, and the last evaluated key
     *
     * @throws Message of the failed request
     */
    public async getAsync():
        Promise<
            MultipleDataBody<
                Cart>> {
        const method = HTTPMethod.GET;

        return Promise.resolve(await super.requestAsync(this._finalUrl, method));
    }

}