import React, { useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
const LoginPopUp = ({setShowLogin}) => {
  const[currentState,setCurrentState]= useState("Sign Up")

  return (
    <div className='login-popup'>
      <form  className="login-popup-container">

<div className="login-popup-title">
  <h2>{currentState}</h2>
  <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
</div>

<div  className="login-popup-inputs">
  {currentState==="Login"?<></>:<input type="text" placeholder='Your name' required/>}
  
  <input type="email" placeholder='Your email' required />
  <input type="password" placeholder='password' required />
</div>
<button>{currentState==="Sign Up"?"Create Account":"Login" }</button>
<div className="login-popup-condition">
  <input type="checkbox" required />
  <p>By Continuing i agree to the terms of use & privacy policy.</p>
</div>
{currentState === "Login" ? (
  <div style={{ display: "inline-flex", gap: "5px", alignItems: "center" }}>
    <p>Create a new account</p>
    <span onClick={() => setCurrentState("Sign up")} style={{ cursor: "pointer", color: "tomato" }}>
      Click here
    </span>
  </div>
) : (
  <div style={{ display: "inline-flex", gap: "5px", alignItems: "center" }}>
    <p>Already have an account</p>
    <span onClick={() => setCurrentState("Login")} style={{ cursor: "pointer", color: "tomato" }}>
      Login here
    </span>
  </div>
)}



      </form>
    </div>
  )
}

export default LoginPopUp