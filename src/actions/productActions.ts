import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from './../constants/productConstants';
import ProductService from '../services/product.service';


const listProducts = () => async (dispatch: any) => {
    
    try {
        dispatch({type : PRODUCT_LIST_REQUEST});
        const data = await ProductService.getProducts();
        dispatch({type: PRODUCT_LIST_SUCCESS, payload : data});
    } catch (error) {
        dispatch({type : PRODUCT_LIST_FAIL, payload: error.message});
    }

}

export {listProducts};