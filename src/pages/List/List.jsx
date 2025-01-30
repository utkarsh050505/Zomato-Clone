import React, {useEffect, useState} from 'react'
import './List.css'
import axios from "axios"
import {toast} from "react-toastify"

const List = () => {

  const [list,setlist] = useState([]);

  const url ="http://localhost:5173"

  const fetchList = async () => {
    const responce = await axios.get('${url}/api/food/list');
    console.log(responce.data);
    if(responce.data.success){
      setlist(responce.data.data)
    }
    else{
      toast.error("Error")
    }
  }
  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'> 
      <p> All Foods List</p>
      <div className="list-table">
          <div className="list-table-format title">
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Prices</b>
              <b>Action</b>
          </div>
          {list.map((item,index)=>{
            return(
              <div key ={index} className='list-table-format'>
                  <img src={'${url}/images/' +item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
                  <p className='cursor'>X</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default List