import {
    PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS
} from './../constants/productConstants';
import { Product } from './../models/product';

type ActionList =   | {type : 'PRODUCT_LIST_REQUEST'; loading : boolean}
                    | {type : 'PRODUCT_LIST_SUCCESS'; payload : Product[]}
                    | {type : 'PRODUCT_LIST_FAIL'; payload : string }

type ActionProduct =    | {type : 'PRODUCT_DETAILS_REQUEST'; loading : boolean}
                        | {type : 'PRODUCT_DETAILS_SUCCESS'; payload : Product}
                        | {type : 'PRODUCT_DETAILS_FAIL'; payload : string }


const productListReducer = (state = {products: []}, action: ActionList) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true};
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload};
        case PRODUCT_LIST_FAIL:
            return {loading: false, error : action.payload};   
        default:
            return state;
    }
}

const productDetailReducer = (state = {product: {}}, action: ActionProduct) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true};
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload};
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error : action.payload};   
        default:
            return state;
    }
}


export { productListReducer, productDetailReducer };
