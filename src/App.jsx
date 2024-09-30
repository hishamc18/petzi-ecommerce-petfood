import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/authentication/Login'
import Signin from './components/authentication/Signin'
import HomePage from './components/HomePage/HomePage'
import { ProductProvider } from './components/HomePage/ProductContext'


function App() {

  return (
          <ProductProvider>
                    <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path='signin' element={<Signin />}/>
              <Route path='home' element={<HomePage />}/>
            </Routes>
            </Router>
          </ProductProvider>
  )
}

export default App
