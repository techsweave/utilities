export interface ISpecValue {
    fieldName: string;
    unitMisure: string;
    value: any;
}
export interface IProduct {
    id: string;
    SKU: string;
    title: string;
    description?: string;
    price?: number;
    discount?: number;
    availabilityQta?: number;
    imageURL?: string;
    isSalable?: boolean;
    categorieId?: string;
    notes?: string;
    tags?: string[];
    customSpecs?: ISpecValue[];
}
