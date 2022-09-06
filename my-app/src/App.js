import React, { useContext } from 'react'
// import './App.css';
// import Cart from './pages/Cart';
// import Home from './pages/Home'
// import Login from './pages/Login';
// import Product from './pages/Product';
// import ProductList from './pages/ProductList';
// import Register from './pages/Register';
import {
  BrowserRouter as Router,
  // Routes,
  // Route,
  // Navigate,
} from "react-router-dom";
// import Success from './pages/success';
// import { useSelector } from 'react-redux';
import { UserContext } from './Context';
// import ProductUpload from './pages/ProductUpload';
import AnimatedRoutes from './components/AnimatedRoutes';
// import { userSelector } from "react-redux"


function App() {
  const { user } = useContext(UserContext)

  return (
    <div className="App">
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  );
}

export default App;
