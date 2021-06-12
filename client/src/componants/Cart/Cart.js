import React, { createContext, useContext, useReducer,useEffect } from "react";
import './Cart.scss';  
import { Scrollbars } from 'react-custom-scrollbars';
import {
    BrowserRouter as Router, 
    NavLink
} from "react-router-dom"; 
import {ContextApi } from "../../App";
const Cart = () => {
    const { item, totalAmount,totalItem, clearCart, removeItem, increment, decrement } = useContext(ContextApi);
    return (
        <>
              <div className="main">
                <div className="cart-section col-xl-9" >
                    <div className="cartHeader">
                        <p>Shopping Cart</p> <h4>Subtotal ({totalItem}): $ {totalAmount}</h4>
                    </div>
                    <hr /> 
                    {totalItem?
                        <Scrollbars style={{ margin: "0", padding: "0", height: "430px" }}>

                            {item.map((element, index) =>
                            (
                                <>
                                    <div className="cart-items">
                                        <div className="cart-img">
                                            <img src="https://images-na.ssl-images-amazon.com/images/I/51IIMW6-TbL.jpg" alt="cart-img" />
                                        </div>
                                        <div className="CartDetails">
                                            <div className="product-name">{element.name}</div>
                                            <div className="delivery_charges"> </div>

                                            <div style={{ color: "black" }} className="delivery_charges">{element.discount}% Discount</div>

                                            <div className="product-quantity">
                                                <button onClick={() => decrement(element._id, element.quantity)} >-</button> {element.quantity} <button onClick={() => increment(element._id, element.price)} >+</button> &nbsp;&nbsp;&nbsp;&nbsp;

                                        <div className="delete" onClick={() => removeItem(element._id)} ><i class="fa fa-trash-o"></i>

                                                </div>
                                                <p>Save For Later</p>
                                            </div>
                                        </div>
                                        <div className="product-price">$ {element.price*element.quantity} </div>
                                    </div>
                                    <hr />
                                </>
                            ))}
                        </Scrollbars>
                        : 'Your Cart Is Empty'}

                </div>

                <div className="proceedToCheckout col-xl-3">

                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" />

                    <div className="buy">
                        <p>Your order is eligible for FREE Delivery. Select this option at checkout. Details</p>
                        <h5>Subtotal ({totalItem} items): $ {totalAmount}</h5>
                        <button ><NavLink to="/buy">Proceed To Ceckout</NavLink></button>
                        <br></br>
                        <button onClick={clearCart}> Clear Cart</button>
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
