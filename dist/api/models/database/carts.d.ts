import { Product } from './products';
export interface Cart {
    id: string;
    userId: string;
    productId: Partial<Product>;
    quantity: number;
    isChanged: boolean;
}
