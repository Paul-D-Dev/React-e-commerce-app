import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productDetails } from '../actions/productActions';
import { Product } from '../models/product';


type productDetails = {
    product: Product,
    loading : boolean,
    error : string
}

interface RootState {
    productDetails: productDetails;
}
    

const useProductDetails = (productId: number) => {

    const productDetail = useSelector((state: RootState) => state.productDetails);
    const {product, loading, error} = productDetail;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productDetails(productId));
    }, [dispatch, productId]);

    return {product, loading, error};
}

export default useProductDetails;