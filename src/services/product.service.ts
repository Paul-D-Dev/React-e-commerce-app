import axios from 'axios';
import { Product } from '../models/product';

export default class ProductService {

    static async getProducts() : Promise<Product[]> {
        const {data} =  await axios.get('/api/products');
            // or
        // const data = await (await axios.get('/api/products')).data
            // or
        // const data = await axios.get('/api/products').then( response => response.data)
        return data;
    }

    static async getProduct(id: number) : Promise<Product> {
        const {data} = await axios.get(`/api/products/${id}`);
        return data;
    }

    static async addTravel(travel: Product, token: string) {
        const { data } = await axios.post('/api/products', travel, 
        {headers : {
            'Authorization': 'Bearer ' + token
        }})
        return data;
    }
 }