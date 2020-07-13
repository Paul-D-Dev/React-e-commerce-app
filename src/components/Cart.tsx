import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import BackButton from './BackButton'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { ProductReducer } from '../models/product';
import './styles/cart.scss'


type Params = {
    id: string
}

type cart = {
    cartItems: ProductReducer[]
}
interface Rootstate {
    cart : cart
}
const Cart: FunctionComponent<RouteComponentProps<Params>> = ({match, location}) => {

    const productId = +match.params.id;
    const qtyProduct = +location.search.split('=')[1];


    // Acces to cart from the store redux
    const cart = useSelector((state: Rootstate) => state.cart)

    // Direct access to the array of cart
    const { cartItems } = cart;
    
    const subTotalMethod = (cartItems: ProductReducer[]) => {
        let qty = 0;
        let price = 0;
        for (const item of cartItems) {               
            qty = qty + item.quantity;
            price = price + item.price * item.quantity;            
        }        
        return {qty, price};
    }

    const subTotal = subTotalMethod(cartItems);

    const removeFromCartHandler = () => {

    }

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qtyProduct ))
        }
    }, [dispatch, productId, qtyProduct])
    return (
        <div>

            <BackButton/>

            <div className="cart">
            
                <div className="cart-list">

                    <ul className="cart-list-container">
                        <li>
                            <h3>Shopping Cart</h3>
                            <h4>Price</h4>
                        </li>

                        {
                            cartItems.length === 0 ? 
                                <li>Cart is empty</li>
                            :
                                cartItems.map( item => 
                                    <li key={item.id}>

                                        <div className="cart-img">
                                            <img src={item.image} alt={item.name}/>
                                        </div>

                                        <div className="cart-name">
                                            <Link to={"/products/" + item.id}>{item.name}</Link>
                                            <div>
                                                Quantity
                                                <select>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                                <button type="button" className="button" onClick={removeFromCartHandler}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                        <div className="cart-price">$ {item.price}</div>

                                    </li>
                                    )
                        }
                    </ul>

                </div>

                <div className="cart-action">
                    <h3>Subtotal ( {subTotal.qty} items) : $ {subTotal.price} </h3>
                    <button className="button primary" disabled={cartItems.length === 0}>
                        Proceed to Checkout
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Cart;