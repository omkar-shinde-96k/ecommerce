import React, { useEffect, useState } from 'react'
import './Navbar.scss';
import { NavLink } from "react-router-dom";

const Navbar = () => {

    const [CartLen, setCartLen] = useState("")

    useEffect(async() => {
        // const CartLength = JSON.parse(localStorage.getItem('products'))
        // let lengths = 0;
        // setCartLen(lengths)
        // if (CartLength) {
        //     let lengths = CartLength.length
        //     setCartLen(lengths)
        // }

        const res = await fetch("/api/cart", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            } 
        });

        const data = await res.json(); 
        setCartLen(data.cart.length)
    },[CartLen])

    return (
        <>

            <navbar />
            <div className="navb">
                <div className="Drawer">
                    <i class=" fa fa-bars"></i>
                </div>

                <div className="logo"><NavLink className="navlink" to="/"><img alt="logo" width="100%" height="80%" src="./images/logo.jpg" /></NavLink></div>

                <div className="deliver-to">
                    <div className="deliver-to-icon"><i class="fa fa-map-marker"></i></div>
                    <div className="deliver-to-location"><NavLink className="navlink" to="/profile" >Deliver to </NavLink>  <span><NavLink className="navlink" to="/profile" >Select your address</NavLink></span> </div>
                </div>

                <div className="search">
                    <div className="all">All &nbsp; <i class="fa fa-angle-down"></i></div>
                    <input type="text" />
                    <div className="search-icon"><i class="fa fa-search"></i></div>
                </div>

                <div className="lang"><div><img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/255px-Flag_of_India.svg.png" alt="country img" width="100%" height="100%" /></div></div>

                <div className="profile-media">sign in</div>
                <div className="profile"><NavLink className="navlink" to="/profile" ><div>Hello,sign in <span>Account & Lists</span></div></NavLink></div>

                <div className="orders"><NavLink className="navlink" to="/orders">Returns <br /> <span>& Orders</span></NavLink></div>

                <div className="cart"><NavLink className="navlink" to="/cart"><i class="fa fa-shopping-cart"></i></NavLink> <span> {CartLen} </span></div>
            </div>

            <div className="search-media">
                <div className="all">All &nbsp; <i class="fa fa-angle-down"></i></div>
                <input type="text" placeholder="&nbsp; Search here" />
                <div className="search-icon"><i class="fa fa-search"></i></div>
            </div>

            <ul className="subnav">
                <li>&nbsp; &nbsp; <i class="fa fa-bars"></i>  All</li>
                <li><NavLink className="navlink" to="orders">Best Sellers</NavLink></li>
                <li><NavLink className="navlink" to="">Mobiles</NavLink></li>
                <li><NavLink className="navlink" to="">Today's Deals</NavLink></li>
                <li><NavLink className="navlink" to="">Fation</NavLink></li>
                <li><NavLink className="navlink" to="">Prime</NavLink></li>
                <li><NavLink className="navlink" to="">New Realese</NavLink></li>
                <li><NavLink className="navlink" to="">Electronics</NavLink></li>
                <li><NavLink className="navlink" to="">Costomer Services</ NavLink></li>
                <li><NavLink className="navlink" to="">Amazon Pay</NavLink></li>
            </ul>
        </>
    )
}

export default Navbar
