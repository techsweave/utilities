import { Service } from './service';
import { IMultipleDataBody } from '../models/lambdaBody';
import { ICart } from '../models/database/carts';
import Stripe from 'stripe';

type StripeResponse = Stripe.Response<Stripe.Checkout.Session>;

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
     * @summary Rquest to the add product endpoint
     *
     * @param {string} productId Id of the product to add to cart
     * @param {string} quantity New quantity
     * @return {Promise<ICart>} Return the new cart row
     *
     * @throws Message of the failed request
     */
    public async addProduct(productId: string, quantity: number): Promise<ICart> {
        const method = 'POST';
        const body: Partial<ICart> = {
            productId: productId,
            quantity: quantity
        };

        return super.requestAsync(this._finalUrl, method, body);
    }

    /**
     * @async
     *
     * @summary Rquest to remove cart row endpoint
     *
     * @param {string} cartId Id of the cart row
     * @return {Promise<ICart>} Return deleted cart row
     *
     * @throws Message of the failed request
     */
    public async removeProduct(cartId: string): Promise<ICart> {
        const method = 'DELETE';
        const finalUrl = this._finalUrl.concat(`/${cartId}`);

        return super.requestAsync(finalUrl, method);
    }

    /**
     * @async
     *
     * @summary Rquest to the change quanty endpoint
     *
     * @param {string} cartId Id of the cart row
     * @param {string} quantity New quantity
     * @return {Promise<ICart>} Return the update cart row
     *
     * @throws Message of the failed request
     */
    public async changeQuantity(cartId: string, quantity: number): Promise<ICart> {
        const method = 'PUT';
        const finalUrl = this._finalUrl.concat(`/${cartId}`);
        const body: Partial<ICart> = {
            quantity: quantity
        };

        return super.requestAsync(finalUrl, method, body);
    }

    /**
     * @async
     *
     * @summary Rquest to the create checkout session endpoint
     *
     * @param {string} successUrl Redirect Url when sripe checkout is successfuly completed
     * @param {string} cancelUrl Redirect Url when sripe checkout fail
     * @return {Promise<StripeResponse>} Return the created session
     *
     * @throws Message of the failed request
     */
    public async goToCheckout(successUrl: string, cancelUrl: string): Promise<StripeResponse> {
        const method = 'POST';
        const finalUrl = this._finalUrl.concat('checkout');
        const body = {
            successUrl: successUrl,
            cancelUrl: cancelUrl
        };

        return super.requestAsync(finalUrl, method, body);
    }

    /**
     * @async
     *
     * @summary Request to the endpoint of get cart
     *
     * @return {Promise<IMultipleDataBody<ICart>>} Return an array of cart rows, count, and the last evaluated key
     *
     * @throws Message of the failed request
     */
    public async getAsync(): Promise<IMultipleDataBody<ICart>> {
        const method = 'GET';

        return Promise.resolve(await super.requestAsync(this._finalUrl, method));
    }

}