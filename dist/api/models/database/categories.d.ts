export interface ISpecTemplate {
    fieldName: string;
    unitMisure: string;
}
export interface ICategory {
    id: string;
    name: string;
    macroCategorieId?: string;
    description?: string;
    texes?: number;
    customSpecTemplates?: ISpecTemplate[];
}
