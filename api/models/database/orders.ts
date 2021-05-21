import { Product } from './products'

export interface OrderedProduct {
    quantity: number;
    productId: Partial<Product>;
    price: number;
}

/**
 * @summary Rappresent a record in orders table
 */
export interface Order {
    id: string;
    userId: string;
    date: Date;
    status: string;
    products?: OrderedProduct[];
}