import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import UserList from './pages/UserList';
import UserEdit from './pages/UserEdit';
import ProductList from './pages/ProductList';
import ProductEdit from './pages/ProductEdit';

const App = () => {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
    console.log(isOpen);
  };
  return (
    <Router>
      <Navbar isOpen={isOpen} toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <main className="py-3">
        <Route path="/login" component={Login} />
        <Route path="/admin/userlist" component={UserList} />
        <Route path="/admin/productlist" component={ProductList} />
        <Route path="/admin/user/:id/edit" component={UserEdit} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/shipping" component={Shipping} />
        <Route path="/payment" component={Payment} />
        <Route path="/placeorder" component={PlaceOrder} />
        <Route path="/order/:id" component={Order} />
        <Route path="/" component={Home} exact />
        <Route path="/product/:id" component={ProductPage} />
        <Route path="/admin/product/:id/edit" component={ProductEdit} />
        <Route path="/cart/:id?" component={Cart} />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
