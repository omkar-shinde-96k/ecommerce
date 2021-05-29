import React, { useEffect, useState } from 'react'
import { 
    NavLink,
    BrowserRouter as Router,
   
} from 'react-router-dom'

 

const InnerCart = () => {

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

    const increment=()=>{
        Product.quantity++
    }

    const decrement=()=>{
        
    }

    return (
        <>
            <div className="main">
                {Product.map((element, index) =>
                ( 
                    <div className="cart-section">

                        <div className="cart-img">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/51IIMW6-TbL.jpg" alt="cart-img" />
                        </div>

                        <div className="product-name">{element.product.name}</div>

                        <div className="product-price"><span>Rs.</span>{element.product.price}</div>

                        <div className="product-quantity"><button onClick={decrement}>-</button> {element.quantity} <button onClick={increment}>+</button></div>

                        <div className="delete"><i class="fa fa-trash-o"></i> </div>

                        <NavLink className="buy" to={() => {
                            return `/dashbord/cart/buy/${element._id}`
                        }}>BUY NOW</NavLink>
                    </div>
                ))}

                <div className="empty" style={{ color: "red", fontSize: "2rem", textAlign: "center" }}>{empty}</div>

            </div>
        </>
    )
}

export default InnerCart
