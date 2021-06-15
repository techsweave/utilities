import { ConditionExpression } from '@aws/dynamodb-expressions';
import { IMultipleDataBody } from '../models';
import { IOrder } from '../models/database';
import { Service } from './service';

/**
 * @summary Orders service
 */
export class Orders extends Service {

    private readonly _finalUrl: string;

    constructor(id: string, region: string, stage: string, accessToken?: string, idToken?: string) {
        super(id, region, stage, accessToken, idToken);
        this._finalUrl = 'orders';
    }

    /**
     * @async
     *
     * @summary Rquest to the delete order endpoint
     *
     * @param {string} orderId Id of the order
     * @return {Promise<IOrder>} Return the deleted order
     *
     * @throws Message of the failed request
     */
    public async deleteAsync(orderId: string): Promise<IOrder> {
        const method = 'DELETE';
        const finalUrl = this._finalUrl.concat(`${orderId}`);

        return super.requestAsync(finalUrl, method);
    }

    /**
     * @async
     *
     * @summary Rquest to the get order endpoint
     *
     * @param {string} orderId Id of the order
     * @return {Promise<IOrder>} Return the order
     *
     * @throws Message of the failed request
     */
    public async getAsync(orderId: string): Promise<IOrder> {
        const method = 'GET';
        const finalUrl = this._finalUrl.concat(`${orderId}`);

        return super.requestAsync(finalUrl, method);
    }

    /**
     * @async
     *
     * @summary Rquest to the change status endpoint
     *
     * @param {string} orderId Id of the order
     * @param {boolean} isFailed Specified if the payement fails or not
     * @return {Promise<IOrder>} Return the update order
     *
     * @throws Message of the failed request
     */
    public async markAsCompletedAsync(orderId: string, isFailed: boolean): Promise<IOrder> {
        const method = 'PUT';
        const finalUrl = this._finalUrl.concat(`${orderId}`);
        const body: Partial<IOrder> = {
            status: isFailed ? 'FAIL' : 'SUCCESS'
        };

        return super.requestAsync(finalUrl, method, body);
    }

    /**
     * @async
     *
     * @summary Rquest to the scan order endpoint
     *
     * @param  {number} limit Max number of orders in scan
     * @param  {string} startKey Value of start element key
     * @param  {number} pageSize Size of the page
     * @param  {string} indexName Name of the index
     * @param  {string} filter Scan filter, see more at https://www.npmjs.com/package/@aws/dynamodb-expressions
     * @return {Promise<IMultipleDataBody<IOrder>>}
     * Return an array of orders, count, and the last evaluated key
     * 
     * @throws Message of the failed request
     */
    public async scanAsync(
        limit: number,
        startKey?: string,
        pageSize?: number,
        indexName?: string,
        filter?: ConditionExpression,
    ): Promise<IMultipleDataBody<IOrder>> {
        const method = 'POST';
        const finalUrl = this._finalUrl.concat('filter');

        const body = {
            limit,
            startKey: startKey ? {
                id: startKey,
            } : undefined,
            pageSize,
            indexName,
            filter,
        };

        return super.requestAsync(finalUrl, method, body);
    }
}

