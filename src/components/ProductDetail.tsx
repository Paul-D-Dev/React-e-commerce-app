import React, { FunctionComponent, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import useProductDetails from '../hooks/productDetails.hook';
import BackButton from './BackButton';
import './styles/product-detail.scss';
import { qtyToArray } from '../helpers/methods';


type Params = {
    id: string;
}

const ProductDetail: FunctionComponent<RouteComponentProps<Params>> = ({match}) => {

    const [qty, setQty] = useState(1);
    
    const productReducer = useProductDetails(match.params.id);

    const product = productReducer.product;

    const numberTraverllers = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQty(+e.target.value);
    }

    // useHistory get the current url
    const history = useHistory()

    const handleAddToCart = () => {
        history.push(`/cart/products${match.params.id}?qty=${qty}`)
    }
    
    return (

        productReducer.loading? 
        <div>Loading ...</div> : 
        
        productReducer.error? 
            <div>{productReducer.error}</div> :

        <div>

            <BackButton/>

            <div className="details">

                <div className="details-image">
                    <img src={product?.image} alt={product?.name}/>
                </div>
            
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{product?.name}</h4>
                        </li>
                        <li>
                            {product?.rating} stars ({product?.nbReviews} reviews)
                        </li>
                        <li>
                            Price : <b>$ {product?.price}</b>
                        </li>
                        <li>
                            <p>Descrition :  </p>
                        </li>
                    </ul>
                </div>

                <div className="details-action">
                    <ul>
                        <li>
                            Price : $ {product?.price}
                        </li>
                        {
                            product.stock > 10 ? 
                                <li>
                                    Trip available
                                </li>
                            : (
                            product.stock > 1 &&
                                <li>
                                Only {product.stock} trips left !   
                                </li>
                            )
                        }


                        { product.stock > 10 ?
                            <li>
                                Traveller's number: 
                                <select value={qty} onChange={numberTraverllers}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </li>
                            : (
                                product.stock > 1 &&
                            <li>
                                Traveller's number: 

                                    <select value={qty} onChange={numberTraverllers}>
                                    { qtyToArray(product.stock).map(x => (
                                        <option key={x+1} value={x+1}>{x + 1}</option>
                                        ))}
                                </select>
                            </li>
                            )
                        }
                            
                        
                            
                        {
                            product.stock > 0 ?
                                <li>
                                    <button className="details-action-btn primary" onClick={handleAddToCart}>Add to cart</button>
                                </li>
                            :   
                            <li>Sold out</li>
                        }
                        
                    </ul>
                </div>
                
            </div>

        </div>
    )
}

export default ProductDetail;