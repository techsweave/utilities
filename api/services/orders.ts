import { Service } from './service'
import { HTTPMethod } from 'http-method-enum'
// import { MultipleDataBody } from '../models/lambdaBody'
// import { Order } from '../models/database/orders';
import Stripe from 'stripe';


/**
 * @summary Orders service
 */
export class Orders extends Service {

    private readonly _finalUrl: string;

    constructor(id: string, region: string, stage: string, accessToken?: string) {
        super(id, region, stage, accessToken);
        this._finalUrl = 'orders';
    }

    /**
     * @async
     *
     * @summary Request to the endpoint of create checkout
     *
     * @param  {string} successUrl Redirect Url in case of Stripe success
     * @param  {string} cancelUrl Redirect Url in case of Stripe fail
     * @return {Promise<Stripe.Response<Stripe.Checkout.Session>>} Return an stripe session
     *
     * @throws Message of the failed request
     */
    public async goToCheckOutAsync(successUrl: string, cancelUrl: string):
        Promise<
            Stripe.Response<
                Stripe.Checkout.Session>> {
        const finalUrl = 'checkout';
        const method = HTTPMethod.POST;

        const body = {
            successUrl,
            cancelUrl,
        };

        return Promise.resolve((await super.requestAsync(finalUrl, method, body)).data);
    }

}

// }