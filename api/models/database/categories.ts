
export interface SpecTemplate {
    fieldName: string;
    unitMisure: string;
}

/**
 * @summary Rappresent a record in categories table
 */
export interface Category {
    id: string;
    name: string;
    macroCategorieId?: string;
    description?: string;
    texes?: number;
    customSpecTemplates?: SpecTemplate[];
}