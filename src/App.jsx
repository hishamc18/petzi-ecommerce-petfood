import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/authentication/Login'
import SignIn from './components/authentication/SignUp'
import HomePage from './components/HomePage/HomePage'
import { ProductProvider } from './components/context/ProductContext'
import Cart from './components/Cart/Cart'
import OrderSummary from './components/Cart/OrderSummary'
import Orders from './components/Cart/Orders'
import WishList from './components/Cart/WishList'

function App() {

  return (
          <ProductProvider>
                    <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path='signin' element={<SignIn />}/>
              <Route path='login' element={<Login />}/>
              <Route path='cart' element={<Cart />}/>
              <Route path='order-summary' element={<OrderSummary />} />
              <Route path='orders' element={<Orders />} />
              <Route path='wishlist' element={<WishList />}/>
            </Routes>
            </Router>
          </ProductProvider>
  )
}

export default App
