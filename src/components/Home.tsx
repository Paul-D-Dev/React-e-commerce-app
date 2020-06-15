import React from 'react';
import data from '../data';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <ul className="products">
            {
                data.products.map(product => (
                    <li className="product">
                        <Link to={`products/${product.id}`}>
                            <img src={product.image} alt={product.name}className="product-image"/>
                        </Link>
                        <Link to={`products/${product.id}`} className="product-name">{product.name}</Link>
                        <div className="product-price">$ {product.price}</div>
                        <div className="product-rating">{product.rating} stars ({product.nbReviews} reviews)</div>
                    </li>
                ))
            }

            </ul>
        </div>
    )
}

export default Home;