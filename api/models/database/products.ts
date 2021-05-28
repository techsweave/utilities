export interface SpecValue {
    fieldName: string;
    unitMisure: string;
    value: any;
}

/**
 * @summary Rappresent a record in products table
 */
export interface Product {
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
    customSpecs?: SpecValue[];
}
