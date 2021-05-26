import { Service } from './service';
import Stripe from 'stripe';
export declare class Orders extends Service {
    constructor(id: string, region: string, stage: string, accessToken?: string, idToken?: string);
    goToCheckOutAsync(successUrl: string, cancelUrl: string): Promise<Stripe.Response<Stripe.Checkout.Session>>;
}
