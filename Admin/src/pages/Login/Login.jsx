import React, { useContext, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';

const LoginPopUp = ({ setShowLogin }) => {

  const { url, setToken } = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Login");

  const [data, setData] = useState({
    email: "",
    password: "",
    restaurantName: "",
    street: "",
    area: "",
    city: "",
    state: "",
    phone: "",
    description: "",
    restaurantOwner: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currentState === 'Login') {
      newUrl += '/api/restaurant/:id';
    }
    else {
      newUrl += '/api/restaurant/create';
    }
    const response = await axios.post(newUrl, data);
    console.log(response)

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
    <div className='login'>
      <form onSubmit={onLogin} className="login-container">

        <div className="login-title">
          <h2>{currentState}</h2>
        </div>

        <div className="login-inputs">
          {currentState === "Login" ? <></> : 
          <>
            <input name='restaurantName' onChange={onChangeHandler} value={data.restaurantName} type="text" placeholder='Restaurant Name' required />
            <input name='description' onChange={onChangeHandler} value={data.description} type="text" placeholder='Description' required />
            <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />
            <input name='area' onChange={onChangeHandler} value={data.area} type="text" placeholder='Area' required />
            <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
            <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required />
            <input name='phone' onChange={onChangeHandler} value={data.phone} type="number" placeholder='Phone' required />
            <input name='restaurantOwner' onChange={onChangeHandler} value={data.restaurantOwner} type="text" placeholder='Restaurant Owner' required />
          </>
          }
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='password' required />
        </div>
        <button type='submit'>{currentState}</button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>By Continuing I agree to the terms of use & privacy policy.</p>
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