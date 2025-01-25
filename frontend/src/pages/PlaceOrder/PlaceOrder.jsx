import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'

const PlaceOrder = () => {
const {getTotalCartAmount} =useContext(StoreContext)

  return (
   <form  className='place-order'>
<div className="place-order-left">
  Delivery Information

<div className="multi-fields">
  <input type="text" placeholder='First name' />
  <input type="text" placeholder='Last name'/>
</div>
<input type="email" placeholder='Email Address' />
<input type="text" placeholder='Street' />
<div className="multi-fields">
  <input type="text" placeholder='city' />
  <input type="text" placeholder='state'/>
</div>
<div className="multi-fields">
  <input type="text" placeholder='Zipcode' />
  <input type="text" placeholder='Country'/>
</div>
<input type="text" placeholder='phone' />
</div>
<div className="place-order-right">


<div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount()+2}</b>
          </div>
          </div>
          <button >PROCEED TO PAYMENT</button>

        </div>

</div>


   </form>
  )
}

export default PlaceOrder