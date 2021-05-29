import React, { useState, useEffect } from 'react'
import './Admin.scss';
import { useHistory } from 'react-router-dom'
import {
    // useHistory,
    NavLink,
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
import AllOrders from './AllOrders';
import AddCategory from './AddCategory';
import AddProduct from './AddProduct';
import CreateProduct from './CreateProduct';

const Admin = () => {

    const [Product, setProduct] = useState([])

    useEffect(() => {
        const apiUrl = `/api/product`;
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data)
                // console.log("data", data);
                // console.log(data.length); 
            });

    }, [Product.length]);


    return (

        <div className="admin row">
            <div className="sidebar col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                <NavLink to="/admin">All Orders</NavLink>
                <NavLink to="/admin/addproduct">Add Product</NavLink>
                <NavLink to="/admin/addcategory">Add category</NavLink>
                <NavLink to="/admin/createproduct">  createproduct</NavLink>
            </div>
            <div className="rightbar col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                <div className="row ">
                    <div className="box  col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-6">
                        <div>
                            <div className="number">{"Data.length"}</div>
                            <div className="box-name">Delivered Orders</div>
                        </div>
                    </div>

                    <div className="box  col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12  ">
                        <div>
                            <div className="number">100</div>
                            <div className="box-name">Pending Orders</div>
                        </div>
                    </div>

                    <div className="box  col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-6">
                        <div>
                            <div className="number">{Product.length}</div>
                            <div className="box-name">Products</div>
                        </div>
                    </div>

                    <div className="box  col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12  ">
                        <div>
                            <div className="number">100</div>
                            <div className="box-name">Costomers</div>
                        </div>
                    </div>

                </div>

                <div className="main-data">
                    <Switch>
                        <Route exact path="/admin" component={AllOrders} />

                        <Route path="/admin/addproduct" component={AddProduct} />
                        <Route path="/admin/addcategory" component={AddCategory} />

                        {/* <Route path="/admin/createproduct" component={CreateProduct} /> */}


                    </Switch>
                </div>

            </div>
        </div>

    )
}

export default Admin
