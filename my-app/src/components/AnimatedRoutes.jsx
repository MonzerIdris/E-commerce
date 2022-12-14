import React, { useContext } from 'react'
// import './App.css';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { UserContext } from '../Context';
import { AnimatePresence } from 'framer-motion'

import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Product from '../pages/Product';
import ProductList from '../pages/ProductList';
import ProductUpload from '../pages/ProductUpload';
import Register from '../pages/Register';
// import Success from './pages/success';
// import { useSelector } from 'react-redux';



export default function AnimatedRoutes() {
    const { user } = useContext(UserContext)
    const location = useLocation()

  return (
    // <AnimatePresence>
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
        
          <Route path="/upload" element={<ProductUpload />} />

        </Routes>
    // </AnimatePresence>
  )
}
