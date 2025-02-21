import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';
// import { useTheme } from '@emotion/react';

const Orders = ({url}) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + '/api/order/list')
    if (response.data.success) {
      setOrders(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt='' className='img'/>
            <div>
              <p className='order-item-food'>
                {order.items.map((item, idx) => 
                  `${item.name} x ${item.quantity}${idx === order.items.length - 1 ? "" : ", "}`
                )}
              </p>
              <p className='order-item-name'>
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}
                </p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
              <p>Items: {order.items.length}</p>
              <p>Amount: ${order.amount}</p>
              <select className='order-item-select'>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
}

export default Orders