import { Service } from './service';
import { HTTPMethod } from 'http-method-enum';
import { IMultipleDataBody } from '../models/lambdaBody';
import { ITag } from '../models/database/tags';


/**
 * @summary Tags service
 */
export class Tags extends Service {

    private readonly _finalUrl: string;

    constructor(id: string, region: string, stage: string, accessToken?: string, idToken?: string) {
        super(id, region, stage, accessToken, idToken);
        this._finalUrl = 'tags';
    }

    /**
     * @async
     *
     * @summary Get a specific tag
     *
     * @param  {string} id Id of the item
     * @return {Promise<ITag>>} Return a tag
     *
     * @throws Message of the failed request
     */
    public async getAsync(id: string): Promise<ITag> {
        const method = HTTPMethod.GET;
        const finalUrl = this._finalUrl.concat(`${id}`);

        return Promise.resolve((await super.requestAsync(finalUrl, method)).data);
    }

    /**
     * @async
     *
     * @summary Get a set of tags
     *
     * @param  {number} limit Redirect Url in case of Stripe success
     * @param  {string} startKey Value of start element key
     * @return {Promise<MultipleDataBody<ITag>>} Return a set of tags
     *
     * @throws Message of the failed request
     */
    public async scanAsync(limit: number, startKey?: string): Promise<IMultipleDataBody<ITag>> {
        const method = HTTPMethod.GET;
        const finalUrl = this._finalUrl.concat('/filter');

        const body = {
            limit: limit,
            startKey: startKey
        };

        return Promise.resolve(await super.requestAsync(finalUrl, method, body));
    }

}

// }