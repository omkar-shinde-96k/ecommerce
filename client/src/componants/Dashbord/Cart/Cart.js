import React, { useEffect, useState } from 'react'
import {
    // useHistory,
    NavLink,
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
import InnerCart from './InnerCart'
import Buy from './Buy'
 
const Cart = () => {

    return (
        <>
            <Switch>
                <Route exact path='/dashbord' component={InnerCart} />

                <Route path='/dashbord/cart/buy' text="hello" component={Buy}/>
            </Switch>

        </>
    )
}





export default Cart;
