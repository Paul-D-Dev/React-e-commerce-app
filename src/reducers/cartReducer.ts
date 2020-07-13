import { Product } from './../models/product';
import { CART_ADD_ITEM } from "../constants/cartConstants";


type ActionCart = {type : 'CART_ADD_ITEM', product: Product};

const cartItems: Product[] = []

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
            
        default : 
            return state;
    }
}

export {cartReducer};