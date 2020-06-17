import ProductService from '../services/product.service';
import {
    PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST,  PRODUCT_LIST_SUCCESS
} from './../constants/productConstants';


const listProducts = () => async (dispatch: any) => {
    
    try {
        dispatch({type : PRODUCT_LIST_REQUEST});
        const data = await ProductService.getProducts();
        dispatch({type: PRODUCT_LIST_SUCCESS, payload : data});
    } catch (error) {
        dispatch({type : PRODUCT_LIST_FAIL, payload: error.message});
    }
}

const productDetails = (productId: number) => async (dispatch: any) => {
    try {
        dispatch({type : PRODUCT_DETAILS_REQUEST, payload : productId});
        const data = await ProductService.getProduct(productId);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload : data});
    } catch (error) {  
        dispatch({type : PRODUCT_DETAILS_FAIL, payload: error.message});
    }
}

export { listProducts, productDetails };
