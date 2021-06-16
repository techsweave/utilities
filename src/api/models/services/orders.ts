import { ConditionExpression } from '@aws/dynamodb-expressions';
import { IMultipleDataBody } from '../lambdaBody';
import { IOrder } from '../database/orders';

export interface IOrders {

    deleteAsync(orderId: string): Promise<IOrder>;

    getAsync(orderId: string): Promise<IOrder>;

    markAsCompletedAsync(orderId: string, isFailed: boolean): Promise<IOrder>;

    scanAsync(
        limit: number,
        startKey?: string,
        pageSize?: number,
        indexName?: string,
        filter?: ConditionExpression,
    ): Promise<IMultipleDataBody<IOrder>>;
}

