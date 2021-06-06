import React, { useEffect, useState } from 'react'
import {
    // useHistory,
    NavLink,
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
import './Cart.scss';
import Buy from './Buy'
import { Scrollbars } from 'react-custom-scrollbars';
const Cart = () => {

    const [Product, setProduct] = useState([])
    const [empty, setEmpty] = useState("")
    // const [Quantity, setQuantity] = useState("0")

    useEffect(async () => {
        // let Product = JSON.parse(localStorage.getItem('products'))
        // console.log('cart', Product);
        // if (Product) {
        //     setProduct(Product)
        // }else{
        //     setEmpty("your cart is empty")
        // } 
        const res = await fetch("/api/cart", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        });
        const data = await res.json();
        setProduct(data.cart)
        // console.log("omakr",data.cart)
    }, [])

    const increment = () => {
        Product.quantity++
    }

    const decrement = () => {

    }

    return (
        <>

            <div className="main">
                <div className="cart-section col-xl-9" >
                    <div className="cartHeader">
                        <p>Shopping Cart</p> <h4>Subtotal (2 items): $72.57</h4>
                    </div>
                    <hr></hr>
                    <Scrollbars style={{ margin: "0", padding: "0", height: "430px" }}>
                        {Product.map((element, index) =>
                        (
                            <>
                                <div className="cart-items">

                                    <div className="cart-img">
                                        <img src="https://images-na.ssl-images-amazon.com/images/I/51IIMW6-TbL.jpg" alt="cart-img" />
                                    </div>
                                    <div className="CartDetails">
                                        <div className="product-name">{element.product.name}</div>

                                        <div className="product-quantity">
                                            <button onClick={decrement}>-</button> {element.quantity} <button onClick={increment}>+</button> &nbsp;&nbsp;&nbsp;&nbsp;

                                            <div className="delete"><i class="fa fa-trash-o"></i>
                                            </div>

                                            <p>Save For Later</p>
                                        </div>


                                    </div>

                                    <div className="product-price">$ {element.product.price}</div>

                                </div>
                                <hr />
                            </>
                        ))}
                    </Scrollbars>
                    <hr />
                </div>

                <div className="empty" style={{ color: "red", fontSize: "2rem", textAlign: "center" }}>{empty}</div>

                <div className="proceedToCheckout col-xl-3">

                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" />

                    <div className="buy">
                        <p>Your order is eligible for FREE Delivery. Select this option at checkout. Details</p>
                        <h5>Subtotal (2 items): $72.57</h5>
                        <button>Proceed To Ceckout</button>
                    </div>

                    <div className="recentlyViewed">
                        Your recently viewed items
                    </div>
                </div>

            </div>

        </>
    )
}


export default Cart;
