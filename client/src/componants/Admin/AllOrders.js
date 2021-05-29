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
        // console.log(result.orders);
        setData(result.orders)

    }, [])

    return (
        <>
            <h2>Orders</h2>
            {Data.map((item) => {
                return (

                    <div className="order">
                        <div className="order-img">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/51IIMW6-TbL.jpg" alt="order-image" />
                        </div>
                        <div className="order-name">
                            {/* {item.product.name} */}
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
