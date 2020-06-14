import React from 'react';
import './App.scss';

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
            <li>
              <div className="product">
                <img src="./images/vietnam.jpg" alt="product" className="product-image"/>
                <a href="/" className="product-name">Viet Nam</a>
                <div className="product-price">$ 2 499</div>
                <div className="product-rating">4.5 stars (10 reviews)</div>
              </div>
            </li>

          </ul>
        </div>
      </main>
      <footer className="footer">All right reserved.</footer>
    </div>
  );
}

export default App;
