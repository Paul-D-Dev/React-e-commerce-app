import { Product } from './../models/product';
import ProductService from '../services/product.service';
import {
    PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST,  PRODUCT_LIST_SUCCESS, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL
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

const productDetails = (productId: string) => async (dispatch: any) => {
    try {
        dispatch({type : PRODUCT_DETAILS_REQUEST, payload : productId});
        const data = await ProductService.getProduct(productId);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload : data});
    } catch (error) {  
        dispatch({type : PRODUCT_DETAILS_FAIL, payload: error.message});
    }
}

const createTravel = (travel: Product) => async (dispatch: any, getState: any) => {
    try {
        dispatch({type : PRODUCT_CREATE_REQUEST});
        const { userSignin: { userInfos } } = getState();     
        
        if(travel._id) {
            const data = await ProductService.updateTravel(travel, userInfos.token);
            dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data, success: true})
        } else {
            const data = await ProductService.addTravel(travel, userInfos.token)
            dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data})
        }

    } catch (error) {
        dispatch({type: PRODUCT_CREATE_FAIL, payload: error.message})
    }
}

const deleteTravel = (id: string) => async (dispatch: any, getState: any) => {
    try {
        dispatch({type : PRODUCT_DELETE_REQUEST});    
        const { userSignin: { userInfos } } = getState();  
        const data = await ProductService.deleteTravel(id, userInfos.token);
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data})

    } catch (error) {
        dispatch({type: PRODUCT_DELETE_FAIL, payload: error.message})
    }
}

export { listProducts, productDetails, createTravel, deleteTravel };
