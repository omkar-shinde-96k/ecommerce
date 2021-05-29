 
import React, { useState, useEffect } from 'react';
import { useHistory} from 'react-router-dom'
const  Orders = () => {
 
    const history = useHistory(); 
    const [Data, setData] = useState([])
 
    useEffect(async() => {
        const res = await fetch('/api/orders',{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt") 
            } 
        }) 
        const data = await res.json(); 
        console.log(data.orders);
        setData(data.orders) 
    }, [Data])
  
    return (
        <>
          
               {
                Data.map(item => {
                    return (  
                        <div className="order">
                        <div className="order-img">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/51IIMW6-TbL.jpg" alt="order-img"/>
                        </div>
                        <div className="order-details">
                            <div className="order-name">{item.product.name}</div>

                            <div className="order-status">Order Status <span> placed </span></div>

                            <div className="order-delivar">Order Deliver on <span>saturday</span></div>

                            <div className="order-price">Order Total Rs. {item.product.price}</div>

                            <div className="order-quantity">Quantity : 4</div>

                            <div className="payment-method">Rs.Cash On Delivery({item.payment_method })</div>

                            <div className="order-address">Shipping Address : {item.address}</div>

                            <div className="order-date">Order Date : {item.created_at}</div>
                    
                        </div>
                    </div>
                    )
                })
            }     
        </>
    )
}

export default Orders;
