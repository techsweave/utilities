interface SpecValue {
    fieldName: string;
    unitMisure: string;
    value: any;
}

/**
 * @summary Rappresent a record in products table
 */
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