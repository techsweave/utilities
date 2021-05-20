import { Service } from './service'
import { ConditionExpression } from '@aws/dynamodb-expressions';
import { HTTPMethod } from 'http-method-enum'
import { MultipleDataBody } from '../models/lambdaBody'
import { Product } from '../models/database/Products';

// export namespace API {

/**
 * @summary Generic service, avery single service class implements this
 */
export class Products extends Service {

    private _finalUrl: string;

    constructor(id: string, region: string, stage: string, accessToken?: string) {
        super(id, region, stage, accessToken);
        this._finalUrl = 'products'
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
       * @return {Promise<MultipleDataBody<Product>>}
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
    ):
        Promise<
            MultipleDataBody<
                Product>> {
        this._finalUrl = this._finalUrl.concat('/filter');
        const method = HTTPMethod.POST;

        const body = {
            limit,
            startKey: startKey ? {
                id: startKey,
            } : undefined,
            pageSize,
            indexName,
            filter,
        };

        return Promise.resolve(await this.requestAsync(this._finalUrl, method, body));
    }

    /**
       * @async
       *
       * @summary Request to the endpoint of get product
       *
       * @param  {string} id Id of the product to fetch
       * @return {Promise<Product>} Return the fetched product
       *
       * @throws Message of the failed request
       */
    public async getAsync(id: string): Promise<Product> {
        this._finalUrl = this._finalUrl.concat(`${id}`);

        const method = HTTPMethod.GET;

        return Promise.resolve((await this.requestAsync(this._finalUrl, method)).data);
    }

    /**
       * @async
       *
       * @summary Request to the endpoint of create product
       *
       * @param  {Product} product Product to create
       * @return {Promise<Product>} Return the created product
       *
       * @throws Message of the failed request
       */
    public async createAsync(product: Product): Promise<Product> {
        const method = HTTPMethod.POST;

        return Promise.resolve((await this.requestAsync('', method, product)).data);
    }

    /**
       * @async
       *
       * @summary Request to the endpoint of update product
       *
       * @param  {Product} product Product to update
       * @return {Promise<Product>} Return the updated product
       *
       * @throws Message of the failed request
       */
    public async updateAsync(product: Product): Promise<Product> {
        this._finalUrl = this._finalUrl.concat(`${product.id}`);

        const method = HTTPMethod.PUT;

        return Promise.resolve((await this.requestAsync(this._finalUrl, method, product)).data);
    }

    /**
       * @async
       *
       * @summary Request to the endpoint of delete product
       *
       * @param  {string} id Id of the product to delete
       * @return {Promise<product>} Return the deleted product
       *
       * @throws Message of the failed request
       */
    public async deleteAsync(id: string): Promise<Product> {
        this._finalUrl = this._finalUrl.concat(`${id}`);

        const method = HTTPMethod.DELETE;

        return Promise.resolve((await this.requestAsync(this._finalUrl, method)).data);
    }

}

// }