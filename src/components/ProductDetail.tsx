import React, { FunctionComponent, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import useProductDetails from '../hooks/productDetails.hook';
import './styles/product-detail.scss';


type Params = {
    id: string;
}

const ProductDetail: FunctionComponent<RouteComponentProps<Params>> = ({match}) => {

    const [qty, setQty] = useState(1);
    
    const productReducer = useProductDetails(+match.params.id);

    const product = productReducer.product;

    const numberTraverllers = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQty(+e.target.value);
    }

    const fewQuatity = (qty: number) => {
        const array = []
        for (let i = 0; i < qty; i++) {
            array.push(i);
        }
        return array;
    }
    
    return (

        productReducer.loading? 
        <div>Loading ...</div> : 
        
        productReducer.error? 
            <div>{productReducer.error}</div> :

        <div>


            <div className="back">
                <Link to="/">Back to Home</Link>
            </div>

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
                            product.quantity > 10 ? 
                                <li>
                                    Trip available
                                </li>
                            : (
                            product.quantity > 1 &&
                                <li>
                                Only {product.quantity} trips left !   
                                </li>
                            )
                        }


                        { product.quantity > 10 ?
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
                                product.quantity > 1 &&
                            <li>
                                Traveller's number: 

                                    <select value={qty} onChange={numberTraverllers}>
                                    { fewQuatity(product.quantity).map(x => (
                                        <option key={x+1} value={x+1}>{x + 1}</option>
                                        ))}
                                </select>
                            </li>
                            )
                        }
                            
                        
                            
                        {
                            product.quantity > 0 ?
                                <li>
                                    <button className="details-action-btn primary">Add to cart</button>
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