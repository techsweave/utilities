import { Service } from './service';
import { MultipleDataBody } from '../models/lambdaBody';
import { Cart } from '../models/database/carts';
export declare class Carts extends Service {
    private readonly _finalUrl;
    constructor(id: string, region: string, stage: string, accessToken?: string);
    getAsync(): Promise<MultipleDataBody<Cart>>;
}
