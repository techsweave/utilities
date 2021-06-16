import { IMultipleDataBody } from '../lambdaBody';
import { ITag, INewTag } from '../database/tags';


export interface ITags {

    getAsync(id: string): Promise<ITag>;

    scanAsync(limit: number, startKey?: string): Promise<IMultipleDataBody<ITag>>;

    deleteAsync(id: string): Promise<ITag>;

    updateAsync(tag: ITag): Promise<ITag>;

    createAsync(tag: INewTag): Promise<ITag>;

}