import React, { FunctionComponent } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import data from '../data';
import './styles/product-detail.scss'

type Params = {
    id: string;
}

const ProductDetail: FunctionComponent<RouteComponentProps<Params>> = ({match}) => {
    
    const product = data.products.find(product => product.id === +match.params.id)
    
    return (
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
                        <li>
                            Number : 
                            <select>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                                <option value="">5</option>
                            </select>
                        </li>
                        <li>
                            <button className="details-action-btn primary">Add to cart</button>
                        </li>
                    </ul>
                </div>
                
            </div>

        </div>
    )
}

export default ProductDetail;