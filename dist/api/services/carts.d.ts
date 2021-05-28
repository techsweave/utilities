import { Service } from './service';
import { IMultipleDataBody } from '../models/lambdaBody';
import { ICart } from '../models/database/carts';
export declare class Carts extends Service {
    private readonly _finalUrl;
    constructor(id: string, region: string, stage: string, accessToken?: string, idToken?: string);
    getAsync(): Promise<IMultipleDataBody<ICart>>;
}
