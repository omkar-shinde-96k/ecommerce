import React, { useEffect, useState } from 'react';
import './item.scss';
import { useParams } from 'react-router';
import { NavLink } from "react-router-dom" 
import jwt_decode from "jwt-decode";
// import { NavLink, Link } from 'react-router-dom';

const Item = () => {

    let user = jwt_decode(localStorage.getItem("jwt"));

    console.log("user", user);

    const { id } = useParams();

    const [Product, setProduct] = useState([])
    const [Address, setAddress] = useState([])

    useEffect(async() => {

        const apiUrl = `/api/product/${id}`;
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.product)
            }); 


        const res = await fetch('/api/users',{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt") 
            } 
        }) 
        const addr = await res.json(); 
        console.log("addresss",addr);
        setAddress(addr[0])

    }, []);

    console.log("ner add",Address.first_name);

    const Cart = async () => {

        // products.push({ _id: Product[0]._id, name: Product[0].name, price: Product[0].price, discount: Product[0].discount, quantity: "1" });

        // localStorage.setItem('products', JSON.stringify(products));

        // let user = jwt_decode(localStorage.getItem("jwt"));

        // console.log("user", user);


        const res = await fetch("/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                user_id: user._id,
                product: Product[0]._id,
            })
        });

        const data = await res.json();

        console.log(data);
        if (data.error) {
            window.alert("This " + data.error)
        }

        if (data.msg) {
            window.alert(data.msg)
        }
    }

    // let products = [];

    // if (localStorage.getItem('products')) {
    //     products = JSON.parse(localStorage.getItem('products'));
    // }
    // const result = JSON.parse(localStorage.getItem('products'))

    // if (localStorage.getItem('products')) {
    //     console.log("result is", result[0].name);
    // }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="item-img col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <img src="https://images-na.ssl-images-amazon.com/images/I/817Z%2BPHWz%2BL._AC_SL1500_.jpg" alt="item image" />
                    </div>
                    <div className="item-details col-xl-5 col-lg-5 col-md-12 col-sm-12 col-xs-12">

                        {Product.map((element, index) => (
                            <>

                                <div className="item-name"> {element.name} </div>

                                <div className="item-price"> Rs. {element.price} /- </div>

                                <div className="item-discount"> {element.discount}% Discount </div>

                                <div className="item-active">

                                    {(() => {
                                        if (!element.active) {
                                            return "Currently Unavailable"
                                        }
                                    })()}

                                </div> 

                                <div className="item-info">
                                <h5>About this item </h5>
                                   <pre> {element.details}</pre>
                                </div>

                            </>

                        ))}
                    </div>
                    <div className="item-details cart-outer-sec col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12">

                        <div className="cart-sec">
                            <div className="withexchange">&nbsp; With Exchange</div>

                            <div className="withoutexchange">
                                <h6> Withot Exchange </h6>
                                <p>
                                    {Product.map((element, index) => (
                                        <>
                                            Rs. {element.price}
  
                                            <span>Rs.{element.price + 500}</span>
                                        </>
                                    ))}
                                </p>

                            </div>

                            <button className="addtocart" onClick={Cart}>Add To Cart</button>

                            <button className="buynow" onClick={Cart}>Buy Now</button>

                            <div className="order-diliver-to">
                                <i class="fa fa-map-marker"></i> <NavLink to="/dashbord/profile">Diliver to {Address.first_name} - {Address.address} </NavLink>
                            </div>

                        </div>

                        <button className="addtowishlist">
                            Add To Wish List
                                </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Item
