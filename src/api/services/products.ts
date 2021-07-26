import { Service } from './service';
import { ConditionExpression } from '@aws/dynamodb-expressions';
import { IMultipleDataBody } from '../models/lambdaBody';
import { INewProduct, IProduct } from '../models/database/products';
import { IProducts } from '../models/services';

/**
 * @summary Products service
 */
export class Products extends Service implements IProducts {

    private _finalUrl: string;

    constructor(id: string, region: string, stage: string, accessToken?: string, idToken?: string) {
        super(id, region, stage, accessToken, idToken);
        this._finalUrl = 'products';
    }

    /**
     * @async
     *
     * @summary Request to the endpoint of scan product
     *
     * @param  {number} limit Max number of products in scan
     * @param  {string} startKey Value of start element key
     * @param  {number} pageSize Size of the page
     * @param  {string} indexName Name of the index
     * @param  {string} filter Scan filter, see more at https://www.npmjs.com/package/@aws/dynamodb-expressions
     * @return {Promise<IMultipleDataBody<IProduct>>}
     * Return an array of products, count, and the last evaluated key
     *
     * @throws Message of the failed request
     */
    public async scanAsync(
        limit: number,
        startKey?: string,
        pageSize?: number,
        indexName?: string,
        filter?: ConditionExpression,
    ): Promise<IMultipleDataBody<IProduct>> {
        const finalUrl = this._finalUrl.concat('/filter');
        const method = 'POST';

        const body = {
            limit,
            startKey: startKey ? {
                id: startKey,
            } : undefined,
            pageSize,
            indexName,
            filter,
        };

        const res = await super.requestAsync(finalUrl, method, body);
        //: IMultipleDataBody<IProduct> | IProduct
        if (!res.data)
            return Promise.resolve({
                count: 1,
                data: [res as IProduct]
            });

        return Promise.resolve(res as IMultipleDataBody<IProduct>);
    }

    /**
     * @async
     *
     * @summary Request to the endpoint of get product
     *
     * @param  {string} id Id of the product to fetch
     * @return {Promise<IProduct>} Return the fetched product
     *
     * @throws Message of the failed request
       */
    public async getAsync(id: string): Promise<IProduct> {
        const finalUrl = this._finalUrl.concat(`/${id}`);
        const method = 'GET';

        return super.requestAsync(finalUrl, method);
    }

    /**
     * @async
     *
     * @summary Request to the endpoint of create product
     *
     * @param  {INewProduct} product Product to create
     * @return {Promise<IProduct>} Return the created product
     *
     * @throws Message of the failed request
     */
    public async createAsync(product: INewProduct): Promise<IProduct> {
        const method = 'POST';

        return super.requestAsync(this._finalUrl, method, product);
    }

    /**
     * @async
     *
     * @summary Request to the endpoint of update product
     *
     * @param  {Product} product Product to update
     * @return {Promise<IProduct>} Return the updated product
     *
     * @throws Message of the failed request
     */
    public async updateAsync(product: IProduct): Promise<IProduct> {
        const finalUrl = this._finalUrl.concat(`/${product.id}`);
        const method = 'PUT';

        return super.requestAsync(finalUrl, method, product);
    }

    /**
     * @async
     *
     * @summary Request to the endpoint of delete product
     *
     * @param  {string} id Id of the product to delete
     * @return {Promise<IProduct>} Return the deleted product
     *
     * @throws Message of the failed request
     */
    public async deleteAsync(id: string): Promise<IProduct> {
        const finalUrl = this._finalUrl.concat(`/${id}`);
        const method = 'DELETE';

        return super.requestAsync(finalUrl, method);
    }

}