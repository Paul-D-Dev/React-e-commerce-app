import { Product } from './../models/product';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';


type productList = {
    products: Product[],
    loading : boolean,
    error : string
}
interface RootState {
    productList: productList;
}
    

const useProducts = () => {

    const productList = useSelector((state: RootState) => state.productList);
    const {products, loading, error} = productList;
    // Equal to 
        // const products: Product[] = productList;
        // const loading: boolean = productList;
        // const error = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return {products, loading, error};
}

export default useProducts;