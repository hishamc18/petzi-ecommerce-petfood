import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/authentication/Login'
import Signin from './components/authentication/Signin'
import HomePage from './components/HomePage/HomePage'
import { ProductProvider } from './components/Context/ProductContext'
import Cart from './components/Context/Cart/Cart'


function App() {

  return (
          <ProductProvider>
                    <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path='signin' element={<Signin />}/>
              <Route path='login' element={<Login />}/>
              <Route path='cart' element={<Cart />}/>
            </Routes>
            </Router>
          </ProductProvider>
  )
}

export default App
