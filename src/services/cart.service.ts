import axios from 'axios';
import { Product } from '../models/product';

export default class CartService {
    static async getCart(productId: number): Promise<Product> {
        const {data} = await axios.get('/api/products/' + productId);
        return data;
    }
}