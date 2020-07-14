import { CART_REMOVE_ITEM } from './../constants/cartConstants';
import { CART_ADD_ITEM } from "../constants/cartConstants";
import { ProductReducer } from './../models/product';


type ActionCart = {type : 'CART_ADD_ITEM', product: ProductReducer}
                | {type : 'CART_REMOVE_ITEM', payload: string}

const cartItems: ProductReducer[] = []

const cartReducer = (state = {cartItems}, action: ActionCart) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            // Item = product add to the cart
            const item = action.product;
            const product = state.cartItems.find(x => x._id === item._id);
            if (product) {
                return { cartItems: state.cartItems.map(x => x._id === product._id ? item : x) }
            }
            return { cartItems: [...state.cartItems, item]}
        case CART_REMOVE_ITEM: 
            const productId = action.payload
            return {cartItems : state.cartItems.filter(x => x._id !== productId )};
        default : 
            return state;
    }
}

export { cartReducer };
