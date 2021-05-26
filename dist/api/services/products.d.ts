import { Service } from './service';
import { ConditionExpression } from '@aws/dynamodb-expressions';
import { MultipleDataBody } from '../models/lambdaBody';
import { Product } from '../models/database/products';
export declare class Products extends Service {
    private _finalUrl;
    constructor(id: string, region: string, stage: string, accessToken?: string, idToken?: string);
    scanAsync(limit: number, startKey?: string, pageSize?: number, indexName?: string, filter?: ConditionExpression): Promise<MultipleDataBody<Product>>;
    getAsync(id: string): Promise<Product>;
    createAsync(product: Product): Promise<Product>;
    updateAsync(product: Product): Promise<Product>;
    deleteAsync(id: string): Promise<Product>;
}
