import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

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
        <Route path="/" component={Home} exact />
        <Route path="/product/:id" component={ProductPage} />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
