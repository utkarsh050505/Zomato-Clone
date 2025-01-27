import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';

const LoginPopUp = ({setShowLogin}) => {

  const {url, setToken} = useContext(StoreContext);

  const[currentState,setCurrentState]= useState("Login");

  const [data, setData] = useState({
      name: "",
      email: "",
      password: ""
  });

  const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}));
  };

  const onLogin = async (event) => {
      event.preventDefault();
      let newUrl = url;
      if (currentState==='Login') {
        newUrl += '/api/user/login';
      }
      else {
        newUrl += '/api/user/register';
      }
      console.log(data);
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      }
      else {
        alert(response.data.message);
      }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">

<div className="login-popup-title">
  <h2>{currentState}</h2>
  <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
</div>

<div  className="login-popup-inputs">
  {currentState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required/>}
  
  <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
  <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='password' required />
</div>
<button type='submit'>{currentState}</button>
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