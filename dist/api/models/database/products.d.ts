interface SpecValue {
    fieldName: string;
    unitMisure: string;
    value: any;
}
export interface Product {
    id: string;
    version: Date;
    title: string;
    description?: number;
    price?: number;
    discount?: number;
    availabilityQta?: number;
    isSalable?: boolean;
    categorieId?: string;
    notes?: string;
    tags?: string[];
    customSpecs?: SpecValue[];
}
export {};
