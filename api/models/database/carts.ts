/**
 * @summary Rappresent a record in carts table
 */
export interface Cart {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    isChanged: boolean;
}