import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import BackButton from './BackButton'
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';


type Params = {
    id: string
}
const Cart: FunctionComponent<RouteComponentProps<Params>> = ({match, location}) => {

    const productId = +match.params.id;
    const qtyProduct = +location.search.split('=')[1];
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qtyProduct ))
        }
    }, [dispatch, productId, qtyProduct])
    return (
        <div>
            <BackButton/>

        </div>
    )
}

export default Cart;