import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.scss';
import Cart from './components/Cart';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Register from './components/Register';
import SignIn from './components/SignIn';
import { User } from './models/user';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Shipping from './pages/Shipping';
import Travels from './pages/Travels';


type payloadUser = {
  loading: boolean,
  // Same userInfos from store redux
  userInfos: User,
  error: string,
}

interface Rootstate {
  userSignin: payloadUser;
  userRegister: payloadUser;
}

const openMenu = () => {
  const sidebar = document.querySelector('.sidebar');
  sidebar?.classList.toggle('open')
}

const App = () => {

  const userSignin = useSelector((state: Rootstate) => state.userSignin);
  const userRegister = useSelector((state: Rootstate) => state.userRegister);
  const { userInfos } = userSignin || userRegister;  
  
  return (
  <Router>
    <div className="grid-container">

      <header className="header">

        <div className="brand">
          <button onClick={openMenu}>
            &#9776;
          </button>
          <Link to="/">Dream Travel</Link>
        </div>

        <div className="header-links">
          <a href="cart">Cart</a>

          {
            userInfos ? 
              <Link to='/profile'>{userInfos.name}</Link>
            :
              <Link to="/signin">Sign in</Link>
          }

        </div>

      </header>

      <aside className="sidebar">
        <h3>World Categories</h3>
        <button onClick={openMenu} className="sidebar-close-btn">x</button>
        <ul>
          <li>Asia</li>
          <li>Europe</li>
        </ul>
      </aside>

      <main className="main">
        <div className="content">
          <Route path='/placeorder' component={PlaceOrder}></Route>
          <Route path='/payment' component={Payment}></Route>
          <Route path='/shipping' component={Shipping}></Route>
          <Route path='/travels' component={Travels}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/signin' component={SignIn}></Route>
          <Route path="/products/:id" component={ProductDetail}></Route>
          <Route path="/cart/products:id?" component={Cart}/>
          <Route path="/" exact ={true} component={Home}></Route>
        </div>
      </main>

      <footer className="footer">All right reserved.</footer>
    </div>
    </Router>
  );
}

export default App;
