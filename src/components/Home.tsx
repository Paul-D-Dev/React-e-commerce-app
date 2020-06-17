import React from 'react';
import { Link } from 'react-router-dom';
import useProductsList from '../hooks/productsList.hook';

const Home = () => {

    const productsReducer = useProductsList();
    const products = productsReducer.products;

    return (
        productsReducer.loading? 
            <div>Loading ...</div> : 

            productsReducer.error? 
            <div>{productsReducer.error}</div> :

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