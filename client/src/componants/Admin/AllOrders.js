import React, { useState, useEffect } from 'react'
import './Admin.scss';
const AllOrders = () => {

    const [Data, setData] = useState([])
    const [refresh, setRefresh] = useState(true)

    const Delete =async(deleteID)=>{ 
        const res = await fetch(`/api/orders/${deleteID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            } 
        })
        const data = await res.json();
        if (data.error) {
            console.log(data.error)
        } else {
            console.log("order deleted")
        }
    }

    useEffect(async () => {
        const res = await fetch('/api/orders', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        const result = await res.json()
        setData(result.orders) 
    },[refresh])

    const Update =async(updateID,status)=>{
        console.log("upid",updateID,"statuss",status);
        const res = await fetch(`/api/orders/${updateID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            } ,
            body: JSON.stringify({
                status
            })
        })
        const data = await res.json();
        if (res.status === 400 || !data) {
            console.log("error")
        } else {
            console.log("Status Updated")
        }
    }

    // ********************* img *************************
    const Img = ({ img }) => {
        const [pimg, setPimg] = useState()
        useEffect(async () => {
            const apiUrl = `/api/${img}`;
            const imgu = await fetch(apiUrl)
            setPimg(imgu.url)
        }, []);
        return (<img src={pimg} alt="product image"/>)
    }

    return (
        <div>
            <h2>Orders</h2>

            <div className="index">
                <div className="imgname"></div>
                <div className="product-name">Product Name</div>
                <div className="address">Address</div>
                <div className="status">Status</div>
                <div className="quantity">Quantity</div>
                <div className="total">Total</div>
                <div className="delete">Delete</div>
            </div>
     
            {Data.map((item) => {
                return (
                    <div className="admin-order" >
                        <div className="order-img">
                            <Img img={item.product.productImage}  />
                        </div>
                        <div className="order-name">
                            {item.product.name}
                        </div>
                        <div className="order-address">
                            {item.address}
                        </div>
                        <div className="order-status">
                            <select onChange={(e)=>Update(item._id,e.target.value)} name="cars" id="cars" >
                                <option value= {item.status} style={{fontWeight:"bold"}} > {item.status} </option> 

                                {item.status=="placed"?"": <option value="placed">placed</option>} 

                                {item.status=="Packaging"?"": <option value="Packaging">Packaging</option>} 

                                {item.status=="Delever To Nearest Center"?"": <option value="Delever To Nearest Center">Delever To Nearest Center</option>}  

                                {item.status=="Out for delivery"?"": <option value="Out for delivery">Out for delivery</option>} 
                                {item.status=="Delevered"?"": <option value="Delevered">Delevered</option>} 
                            </select>
                        </div>
                        <div className="order-quantity">
                            {item.quantity}
                        </div>
                        <div className="order-total">
                            {item.price*item.quantity}
                        </div>
                        <div className="order-delete">
                            <i onClick={()=>{
                                Delete(item._id)
                                setRefresh(!refresh)
                                }}  className="fa fa-trash"></i>
                        </div>
                        <br />
                    </div>
                )
            })
            }
        </div>
    )
}

export default AllOrders
