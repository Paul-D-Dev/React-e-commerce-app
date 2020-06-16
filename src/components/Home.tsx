import React from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/product.hook';

const Home = () => {

    const products = useProducts();

    return (
        <div>
            <ul className="products">
            {
                products.map(product => (
                    <li className="product" key={product.id}>
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