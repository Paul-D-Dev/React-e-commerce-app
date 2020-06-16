import axios from 'axios';
import {Product} from '../models/product';

export default class ProductService {

    static async getProducts() : Promise<Product[]> {
        const {data} =  await axios.get('api/products');
            // or
        // const data = await (await axios.get('api/products')).data
            // or
        // const data = await axios.get('api/products').then( response => response.data)
        return data;
    }
}