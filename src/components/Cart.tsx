import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { qtyToArray } from '../helpers/methods';
import { ProductReducer } from '../models/product';
import BackButton from './BackButton';
import './styles/cart.scss';


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
    const history = useHistory();
    

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

    const modifyQtyFromCart = (productId: number, e: React.ChangeEvent<HTMLSelectElement>) => {
        const newQty = +e.target.value
        dispatch(addToCart(productId, newQty))
        history.replace('/cart/products3?qty=' + newQty)
    }

    const removeFromCartHandler = (productId: number) => {
        dispatch(removeFromCart(productId));
    }

    const checkoutHandler = () => {
        history.push('/signin?redirect=shipping')
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
                                <div>Cart is empty</div>
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
                                                <select value={item.quantity} onChange={(e) => modifyQtyFromCart(item.id, e)}>
                                                    {qtyToArray(item.stock).map(x => (
                                                        <option key={x+1} value={x+1}>{x + 1}</option>
                                                    ))}
                                                </select>
                                                <button type="button" className="button" onClick={() => removeFromCartHandler(item.id)}>
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
                    <button className="button primary width100" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                        Proceed to Checkout
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Cart;