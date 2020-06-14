import React from 'react';
import './App.scss';
import data from './data'

const openMenu = () => {
  const sidebar = document.querySelector('.sidebar');
  sidebar?.classList.toggle('open')
}

const App = () => {
  return (
    <div className="grid-container">

      <header className="header">
        <div className="brand">
          <button onClick={openMenu}>
            &#9776;
          </button>
          <a href="/">Dream Travel</a>
        </div>
        <div className="header-links">
          <a href="cart">Cart</a>
          <a href="signin">Sign in</a>
        </div>
      </header>

      <aside className="sidebar">
        <h3>Shopping Categories</h3>
        <button onClick={openMenu} className="sidebar-close-btn">x</button>
        <ul>
          <li>Asia</li>
          <li>Europe</li>
        </ul>
      </aside>

      <main className="main">
        <div className="content">
          <ul className="products">
            {
              data.products.map(product => (
                <li className="product">
                  <img src={product.image} alt={product.name}className="product-image"/>
                  <a href="/" className="product-name">{product.name}</a>
                  <div className="product-price">$ {product.price}</div>
                  <div className="product-rating">{product.rating} stars ({product.nbReviews} reviews)</div>
                </li>
                ))
              }

          </ul>
        </div>
      </main>
      <footer className="footer">All right reserved.</footer>
    </div>
  );
}

export default App;
