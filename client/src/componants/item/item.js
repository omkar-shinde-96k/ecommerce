import React, { useEffect, useState, useContext } from 'react';
import './item.scss';
import { useParams } from 'react-router';
import { ContextApi } from '../../App'
import { NavLink } from "react-router-dom";
// import { Scrollbars } from 'react-custom-scrollbars';
const Item = () => {

    const { id } = useParams();
    const [Product, setProduct] = useState([{ name: "loading..." }])
    const [rating, setRating] = useState({title:"",details:""})
    const [getrating, setgetRating] = useState([])
    const [autoreload, setautoreload] = useState(true)

    let { User } = useContext(ContextApi); 

    const handleInputs = (event) => { 
        let name = event.target.name;
        let value = event.target.value;  
         setRating({ ...rating, [name]: value }) 
     } 

    const PostData = async (event) => {
        event.preventDefault();
        const { title, details } = rating; 
        const res = await fetch("/api/rating", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                user: User._id,
                product: Product[0]._id,
                title ,
                details 
            })
        }); 
        const data = await res.json();  
        setRating({title:"",details:""}) 
        setautoreload(!autoreload)
        if (res.status === 400 || !data) { 
            window.alert("please check your internet connection")
        } 
    }

    
    useEffect(async () => {

        fetch(`/api/product/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.product)
            }); 
            const res = await fetch(`/api/rating/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            })
            const data = await res.json(); 
            setgetRating(data.rating)    
    },[autoreload]); 
   
    const Cart = async () => {
        let products = [];
        if (!JSON.parse(localStorage.getItem('products'))) {
            localStorage.setItem('products', JSON.stringify(products));
        }
        products = JSON.parse(localStorage.getItem('products'))
        products.push({ _id: Product[0]._id, name: Product[0].name, price: Product[0].price, discount: Product[0].discount, quantity: 1 });
        localStorage.setItem('products', JSON.stringify(products));
        alert("product added to Cart")
    } 
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="item-img col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <img src="https://images-na.ssl-images-amazon.com/images/I/817Z%2BPHWz%2BL._AC_SL1500_.jpg" alt="item image" />
                    </div>
                    <div className="item-details col-xl-5 col-lg-5 col-md-12 col-sm-12 col-xs-12">
                        <div className="item-name"> {Product[0].name} </div>
                        <div className="item-price"> Rs. {Product[0].price} /- </div>
                        <div className="item-discount"> {Product[0].discount}% Discount </div>
                        <div className="item-active">
                            {(() => {
                                if (!Product[0].active) {
                                    return "Currently Unavailable"
                                }
                            })()}
                        </div>
                        <div className="item-info">
                            <h5>About this item </h5>
                            <p> {Product[0].details}</p>
                        </div>
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
                                <i class="fa fa-map-marker"></i> <NavLink to="/dashbord/profile">Diliver to {User.first_name} - {User.address} </NavLink>
                            </div> 
                        </div> 
                        <button className="addtowishlist">
                            Add To Wish List
                        </button>
                    </div>
                </div>
                <hr />
                <div className="qna">
                    <h3>Have a question?</h3>
                    <p>Find answers in product info, Q&As, reviews</p>
                    <form>
                        <input type="text" placeholder="Type your question or keyword" />
                    </form>
                </div>
                <hr />
                <div className="reviews container-fluid">
                    <div className="row">
                        <div className="stars col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                            <h3>Customer reviews</h3>
                            <h4>3.4 out of 5</h4>
                            <p>87 global ratings</p>
                        </div>
                        <div className="write-review col-xl-9 col-lg-9 col-md-12 col-sm-12 col-xs-12">
                            <form method="POST">
                                <h4>Write Review</h4>
                                <input type="text"  value={rating.title} name="title" onChange={handleInputs}  placeholder="Title" />
                                <input type="text"  value={rating.details} name="details" onChange={handleInputs} placeholder="Write your review" />
                                <button onClick={PostData}>Submit</button>
                            </form>
                            <hr />
                            {getrating.map((element, index) => (
                            <div className="buyers-reviews">
                                <div className="buyers">
                                    <div className="buyers-img">

                                    </div>
                                    <div className="buyers-name">
                                    &nbsp; {element.user.first_name} &nbsp;
                                      {element.user.last_name}
                                    </div>
                                </div>
                                <div className="buyer-rating-title">
                                    <div className="buyer-rating">
                                        3.2 
                                    </div>
                                    <div className="buyer-title">
                                    &nbsp; <b>{element.title}</b>
                                    </div>
                                </div>
                                <p>Reviewed in India on 18 December 2020</p>
                                <div className="detail-review">
                                {element.details}
                                </div>
                            </div>
                              ))}  
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Item


