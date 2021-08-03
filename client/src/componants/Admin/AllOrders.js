import React, { useState, useEffect } from 'react'
import './Admin.scss';
import { useHistory } from 'react-router-dom'
const AllOrders = () => {


    const history = useHistory();
    const [Data, setData] = useState([])

    useEffect(async () => {
        const res = await fetch('/api/orders', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        const result = await res.json()
        setData(result.orders)

    }, [])

    // ********************* img *************************
    const Img = ({ img }) => {
        const [pimg, setPimg] = useState()
        useEffect(async () => {
            const apiUrl = `/api/${img}`;
            const imgu = await fetch(apiUrl)
            setPimg(imgu.url)
        }, []);
        return (<img src={pimg} />)
    }

    return (
        <>
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
                    <div className="admin-order">
                        <div className="order-img">
                            <Img img={item.product.productImage} />
                        </div>
                        <div className="order-name">
                            {item.product.name}
                        </div>
                        <div className="order-address">
                            {item.address}
                        </div>
                        <div className="order-status">
                            <select name="cars" id="cars">
                                <option value="volvo"> {item.status} </option>
                                <option value="saab"> low to hei</option>
                                <option value="opel">Opel</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                        <div className="order-quantity">
                            {item.quantity}
                        </div>
                        <div className="order-total">
                            {item.price}
                        </div>
                        <div className="order-delete">
                            delete
                        </div>
                        <br />
                    </div>


                )
            })
            }
        </>
    )
}

export default AllOrders
