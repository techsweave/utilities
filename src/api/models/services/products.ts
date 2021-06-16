import { ConditionExpression } from '@aws/dynamodb-expressions';
import { IMultipleDataBody } from '../lambdaBody';
import { INewProduct, IProduct } from '../database/products';


export interface IProducts {

    scanAsync(
        limit: number,
        startKey?: string,
        pageSize?: number,
        indexName?: string,
        filter?: ConditionExpression,
    ): Promise<IMultipleDataBody<IProduct>>;

    getAsync(id: string): Promise<IProduct>;

    createAsync(product: INewProduct): Promise<IProduct>;

    updateAsync(product: IProduct): Promise<IProduct>;

    deleteAsync(id: string): Promise<IProduct>;
}