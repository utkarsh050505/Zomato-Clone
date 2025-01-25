import React  from 'react'
import Navbar from './components/Navbar/Navbar' 
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import Home from './pages/Home/home'
import Cart from './pages/Cart/cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'

const App = () => {
const [showLogin,setShowLogin] =useState(false)

  return (
    <>
    {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}
     <div className='app'>
    <Navbar setShowLogin={setShowLogin} />
    <Routes>

    <Route path='/' element={<Home/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/Order' element={<PlaceOrder/>}/>

</Routes>
    </div>
    <Footer />
    
    </>
   
  )
}

export default App