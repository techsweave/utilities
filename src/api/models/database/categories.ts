
export interface ISpecTemplate {
    fieldName: string;
    unitMisure: string;
}

/**
 * @summary Represent a record in categories table
 */
export interface ICategory {
    id: string;
    name: string;
    macroCategorieId?: string;
    description?: string;
    taxes?: number;
    customSpecTemplates?: ISpecTemplate[];
}

export type INewCategory = Omit<ICategory, 'id'>