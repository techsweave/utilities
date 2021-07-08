export interface ISpecValue {
    fieldName: string;
    unitMisure: string;
    value: any;
}

/**
 * @summary Represent a record in products table
 */
export interface IProduct {
    id: string;
    SKU: string;
    title: string;
    description?: string;
    price: number;
    discount?: number;
    availabilityQta?: number;
    imageURL?: string;
    isSalable?: boolean;
    categorieId?: string;
    notes?: string;
    tags?: string[];
    customSpecs?: ISpecValue[];
}

export type INewProduct = Omit<Omit<IProduct, 'id'>, 'SKU'>