export interface IOrderedProduct {
    quantity: number;
    productId: string;
    price: number;
}

/**
 * @summary Represent a record in orders table
 */
export interface IOrder {
    id: string;
    userId: string;
    date: Date;
    status: string;
    products?: IOrderedProduct[];
}