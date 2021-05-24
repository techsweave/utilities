export interface SpecTemplate {
    fieldName: string;
    unitMisure: string;
}
export interface Category {
    id: string;
    name: string;
    macroCategorieId?: string;
    description?: string;
    texes?: number;
    customSpecTemplates?: SpecTemplate[];
}
