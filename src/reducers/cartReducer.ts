import { CART_REMOVE_ITEM } from './../constants/cartConstants';
import { CART_ADD_ITEM } from "../constants/cartConstants";
import { ProductReducer } from './../models/product';


type ActionCart = {type : 'CART_ADD_ITEM', product: ProductReducer}
                | {type : 'CART_REMOVE_ITEM', payload: number}

const cartItems: ProductReducer[] = []

const cartReducer = (state = {cartItems}, action: ActionCart) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            // Item = product add to the cart
            const item = action.product;
            const product = state.cartItems.find(x => x.id === item.id);
            if (product) {
                return { cartItems: state.cartItems.map(x => x.id === product.id ? item : x) }
            }
            return { cartItems: [...state.cartItems, item]}
        case CART_REMOVE_ITEM: 
            const productId = action.payload
            return {cartItems : state.cartItems.filter(x => x.id!== productId )};
        default : 
            return state;
    }
}

export { cartReducer };
