import { Service } from './service';
import { ConditionExpression } from '@aws/dynamodb-expressions';
import { IMultipleDataBody } from '../models/lambdaBody';
import { IProduct } from '../models/database/products';
export declare class Products extends Service {
    private _finalUrl;
    constructor(id: string, region: string, stage: string, accessToken?: string, idToken?: string);
    scanAsync(limit: number, startKey?: string, pageSize?: number, indexName?: string, filter?: ConditionExpression): Promise<IMultipleDataBody<IProduct>>;
    getAsync(id: string): Promise<IProduct>;
    createAsync(product: IProduct): Promise<IProduct>;
    updateAsync(product: IProduct): Promise<IProduct>;
    deleteAsync(id: string): Promise<IProduct>;
}
