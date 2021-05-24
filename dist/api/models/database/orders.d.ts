import { Product } from './products';
export interface OrderedProduct {
    quantity: number;
    productId: Partial<Product>;
    price: number;
}
export interface Order {
    id: string;
    userId: string;
    date: Date;
    status: string;
    products?: OrderedProduct[];
}
