import React, { useContext } from 'react'
import './Buy.scss' 
import { ContextApi } from "../../../App";
const Buy = () => {
 
    const { item, totalAmount,totalItem, clearCart, removeItem, increment, decrement,User } = useContext(ContextApi);  

    const postorder = async() => {
       
        item.map(async(currElem,index)=>{

            const {_id,quantity,price} = currElem

            const res = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    "orders":[{
                         "payment_method": "COD", 
                         "product": _id,
                         "user": User._id,
                         "address": User.address,
                         "quantity": quantity ,
                         "price":price
                     }]
                 })
            });
            const data = await res.json(); 
            if (data) {
                alert("order placed")
            } else {
                alert("404 error")
            }
    }) 

      

    }

    return (
        <div className="container buyComp">
            <br />
            <h2>Select a delivery address</h2>
            <p>Is the address you'd like to use displayed below? If so, click the corresponding "Deliver to this address" button. Or you can enter a new delivery address. </p>
            <br />
            <h3>Total Amount : {totalAmount}</h3>
            <hr />
            <div className="buy-address">
                Bandu garaju rode<br />
                At po. Sarud , Tal : shahuwadi<br />
                Narayan peth , near vithal temple<br />
                KOLHAPUR, MAHARASHTRA 416214<br />
                India <br /><br />

                <button onClick={postorder}>Deliver to this address </button>
                <div className="edit-add">
                    <button>Edit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button>Delete</button>
                </div>
            </div>
  
 
            
        </div>
    )
}

export default Buy
