import { IMultipleDataBody } from '../lambdaBody';
import { INewCategory, ICategory } from '../database/categories';


export interface ICategories {

    scanAsync(
        limit: number,
        startKey?: string,
        pageSize?: number,
    ): Promise<IMultipleDataBody<ICategory>>;

    getAsync(id: string): Promise<ICategory>;

    createAsync(category: INewCategory): Promise<ICategory>;

    updateAsync(category: ICategory): Promise<ICategory>;

    deleteAsync(id: string): Promise<ICategory>;

}