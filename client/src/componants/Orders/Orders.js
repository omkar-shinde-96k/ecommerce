
import React, { useState, useEffect } from 'react';
import './Orders.scss'
import { useHistory } from 'react-router-dom'
const Orders = () => {

    const history = useHistory();
    const [Data, setData] = useState([{
        "quantity": 5,
        "payment_method": "COD",
        "status": "placed",
        "_id": "60c2eaa2b2809347b8ffd36c",
        "product": { "name": "Loading.." },
        "price": 800,
        "address": "mumbai",
        "user": "608a276319a7293be847dcc6",
        "created_at": "2021-06-11T04:46:26.123Z",
        "updated_at": "2021-06-11T04:46:26.123Z",
        "__v": 0
    }])

    useEffect(async () => {
        const res = await fetch('/api/orders', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        const data = await res.json();
        setData(data.orders)
    }, []) 

    // ****************** img ****************************
    const Img = ({img}) => {
        const [pimg, setPimg] = useState()
        useEffect(async () => {
            const apiUrl = `/api/${img}`;
            const imgu = await fetch(apiUrl)
            setPimg(imgu.url)
        }, []);
        return ( <img src={pimg} alt="order-img" /> 
        )
    }

    return (
        <>

            {
                Data.map(item => {
                    return (
                        <div className="order">
                            <div className="order-img">
                                <Img img={item.product.productImage} />
                            </div>
                           
                            <div className="order-details">
                                <div className="order-name">{item.product.name}</div>

                                <div className="order-status">Order Status <span> placed </span></div>

                                <div className="order-delivar">Order Deliver on <span>saturday</span></div>

                                <div className="order-price">Order Total Rs. {item.product.price}</div>

                                <div className="order-quantity">Quantity :{item.quantity}</div>

                                <div className="payment-method">Rs.Cash On Delivery({item.payment_method})</div>

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
