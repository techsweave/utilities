
export interface ISpecTemplate {
    fieldName: string;
    unitMisure: string;
}

/**
 * @summary Rappresent a record in categories table
 */
export interface ICategory {
    id: string;
    name: string;
    macroCategorieId?: string;
    description?: string;
    texes?: number;
    customSpecTemplates?: ISpecTemplate[];
}