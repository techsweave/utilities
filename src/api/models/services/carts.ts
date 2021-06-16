import { IMultipleDataBody } from '../lambdaBody';
import { ICart } from '../database/carts';
import Stripe from 'stripe';

type StripeResponse = Stripe.Response<Stripe.Checkout.Session>;


export interface ICarts {

    addProductAsync(productId: string, quantity: number): Promise<ICart>;

    removeProductAsync(cartId: string): Promise<ICart>;

    changeQuantityAsync(cartId: string, quantity: number): Promise<ICart>;

    goToCheckoutAsync(successUrl: string, cancelUrl: string): Promise<StripeResponse>;

    getAsync(): Promise<IMultipleDataBody<ICart>>;

}