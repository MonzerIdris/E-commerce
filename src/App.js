import React, { useContext } from 'react'
// import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home'
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Success from './pages/success';
// import { useSelector } from 'react-redux';
import { UserContext } from './Context';
// import { userSelector } from "react-redux"


function App() {
  const { user } = useContext(UserContext)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index path='/' element={ <Home /> }>
                        
          </Route>
          <Route path='products' element={ <ProductList /> }>
            
          </Route>
          <Route path='products/:category' element={ <ProductList /> }>
            
          </Route>
          <Route path='product/:id' element={ <Product /> }>
            
          </Route>
          { !user &&
          <>
           <Route path='register' element={<Register />} />
            
            <Route path='login' element={<Login />} />
            
          </>}

          <Route path='cart' element={ <Cart /> }>
            
          </Route>
          {/* <Route path='success' element={ <Success /> }>
            
          </Route> */}
        <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
