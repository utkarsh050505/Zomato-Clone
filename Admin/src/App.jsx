import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
// import Order from './pages/Orders/Order'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from './pages/Orders/Orders';
import Login from '../src/pages/Login/Login'

const App = () => {
  const [showLogin,setShowLogin] =useState(false)
  const url = 'http://localhost:4000'
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      <ToastContainer/>
      {!isLoginPage && <Navbar setShowLogin={setShowLogin} />}
     <div className='app'>
    </div>
      <hr/>
      <div className='app-content'>
      {!isLoginPage && <Sidebar />}
        <Routes>
          <Route path="/login" element = {showLogin ? <Login setShowLogin={setShowLogin}/>:<></>}/>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path='/orders' element={<Orders url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App