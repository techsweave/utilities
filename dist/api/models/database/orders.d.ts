export interface IOrderedProduct {
    quantity: number;
    productId: string;
    price: number;
}
export interface IOrder {
    id: string;
    userId: string;
    date: Date;
    status: string;
    products?: IOrderedProduct[];
}
