import React from 'react'
import './Footer.css'

import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id="footer">

      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur incidunt vitae ipsa velit? Porro, numquam odit quia asperiores doloremque odio, officia perspiciatis id laborum provident, eveniet molestias natus excepturi facere!</p>
          <div className="footer-social-icons">'
            <img src={assets.facebook_icon} alt=""/>
            <img src={assets.twitter_icon}  alt=""/>
            <img src={assets.linkedin_icon} alt=""/>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
         <Link to='/' onClick={()=>setMenu("home")} >home</Link>
          <li>About-us</li>
          <li>Delivery</li>
          <li>Privacy policy</li>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1234 3351 1234</li>
            <li>company@tomato.com</li>

          </ul>
        </div>
      </div>
      <p className="footer-copyright">
        copyright 2024 @ Tomato.com -All Rights Reserved.
      </p>
      <hr />
    </div>
  )
}

export default Footer
