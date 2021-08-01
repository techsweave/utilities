import { Service } from './service';
import { IMultipleDataBody } from '../models/lambdaBody';
import { INewCategory, ICategory } from '../models/database/categories';
import { ICategories, IProducts } from '../models/services';
import { ConditionExpression } from '@aws/dynamodb-expressions';

/**
 * @summary Categories service
 */
export class Categories extends Service implements ICategories {

    private _finalUrl: string;
    private readonly _productService: IProducts;

    constructor(
        productsService: IProducts, // Dependency injection!
        id: string,
        region: string,
        stage: string,
        accessToken?: string,
        idToken?: string) {

        super(id, region, stage, accessToken, idToken);
        this._finalUrl = 'categories';
        this._productService = productsService;
    }

    /**
     * @async
     *
     * @summary Request to the endpoint of scan category
     *
     * @param  {number} limit Max number of categories in scan
     * @param  {string} startKey Value of start element key
     * @param  {number} pageSize Size of the page
     * @return {Promise<IMultipleDataBody<ICategory>>}
     * Return an array of categories, count, and the last evaluated key
     *
     * @throws Message of the failed request
     */
    public async scanAsync(
        limit: number,
        startKey?: string,
        pageSize?: number,
        indexName?: string,
        filter?: ConditionExpression,
    ): Promise<IMultipleDataBody<ICategory>> {
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

        return Promise.resolve(await super.requestAsync(finalUrl, method, body));
    }

    /**
     * @async
     *
     * @summary Request to the endpoint of get category
     *
     * @param  {string} id Id of the category to fetch
     * @return {Promise<ICategory>} Return the fetched category
     *
     * @throws Message of the failed request
       */
    public async getAsync(id: string): Promise<ICategory> {
        const finalUrl = this._finalUrl.concat(`/${id}`);
        const method = 'GET';

        return super.requestAsync(finalUrl, method);
    }

    /**
     * @async
     *
     * @summary Request to the endpoint of create category
     *
     * @param  {INewcategorie} category category to create
     * @return {Promise<ICategory>} Return the created category
     *
     * @throws Message of the failed request
     */
    public async createAsync(category: INewCategory): Promise<ICategory> {
        const method = 'POST';

        return super.requestAsync(this._finalUrl, method, category);
    }

    /**
     * @async
     *
     * @summary Request to the endpoint of update category
     *
     * @param  {category} category category to update
     * @return {Promise<ICategory>} Return the updated category
     *
     * @throws Message of the failed request
     */
    public async updateAsync(category: ICategory): Promise<ICategory> {
        const finalUrl = this._finalUrl.concat(`/${category.id}`);
        const method = 'PUT';

        return super.requestAsync(finalUrl, method, category);
    }

    /**
     * @async
     *
     * @summary Request to the endpoint of delete category
     *
     * @param  {string} id Id of the category to delete
     * @return {Promise<ICategory>} Return the deleted category
     *
     * @throws Message of the failed request
     */
    public async deleteAsync(id: string): Promise<ICategory> {

        const filter: ConditionExpression = {
            type: 'Equals',
            subject: 'categorieId',
            object: id
        };

        if ((await this._productService.scanAsync(1, undefined, undefined, undefined, filter)).count > 0) {
            throw {
                name: 'CategoryDeleteNotAllowed',
                description: 'There\'s some products whit this category, please delete all the related products before delete this category'
            };
        }

        const finalUrl = this._finalUrl.concat(`/${id}`);
        const method = 'DELETE';

        return super.requestAsync(finalUrl, method);
    }

}