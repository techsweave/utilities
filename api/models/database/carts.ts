import { Product } from './products'

/**
 * @summary Rappresent a record in carts table
 */
export interface Cart {
    id: string;
    userId: string;
    productId: Partial<Product>;
    quantity: number;
    isChanged: boolean;
}