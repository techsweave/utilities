import { Service } from './service';
import { IMultipleDataBody } from '../models/lambdaBody';
import { ICart } from '../models/database/carts';

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
     * @return {Promise<IMultipleDataBody<ICart>>}
     * Return an array of carts, count, and the last evaluated key
     *
     * @throws Message of the failed request
     */
    public async getAsync():
        Promise<
            IMultipleDataBody<
                ICart>> {
        const method = 'GET';

        return Promise.resolve(await super.requestAsync(this._finalUrl, method));
    }

}