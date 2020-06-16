import { useEffect, useState } from 'react';
import { Product } from '../models/product';
import ProductService from '../services/product.service';


const useProducts = () => {

    const [products, setProducts] = useState<Product[]>([])
    
    useEffect(() => {
        ProductService.getProducts().then(fecthProducts => setProducts(fecthProducts))
    }, []);

    return products;
}

export default useProducts;