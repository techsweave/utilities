export interface SpecValue {
    fieldName: string;
    unitMisure: string;
    value: any;
}
export interface Product {
    id: string;
    version: Date;
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
    customSpecs?: SpecValue[];
}
