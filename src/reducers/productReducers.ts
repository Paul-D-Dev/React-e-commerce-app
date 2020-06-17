import { Product } from './../models/product';
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from './../constants/productConstants';

type Action =   | {type : 'PRODUCT_LIST_REQUEST'; loading : boolean}
                | {type : 'PRODUCT_LIST_SUCCESS'; payload : Product[]}
                | {type : 'PRODUCT_LIST_FAIL'; payload : string }

const productListReducer = (state = {products: []}, action: Action) => {
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

export {productListReducer};