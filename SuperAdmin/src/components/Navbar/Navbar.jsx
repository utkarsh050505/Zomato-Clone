import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ setShowLogin }) => {
  const { token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <div className="right-section">
        <img className='profile' src={assets.profile_image} alt="" />
        {!token ? <button onClick={() => {
          setShowLogin(true);
          navigate("/login");
        }}>Sign in</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='' />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt='' /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt='' /><p>Logout</p></li>
            </ul>
          </div>}
      </div>

    </div>
  )
}

export default Navbar