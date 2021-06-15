import React, { createContext, useReducer, useEffect, useState } from "react";
import './App.css';
import NotFound from './componants/404.js';
import Navbar from './componants/Navbar/Navbar.js';
import Footer from './componants/Footer/Footer.js';
import Slider from './componants/Slider.js';
import Categories from './componants/Categories/Categories.js';
import Products from './componants/Products/Products.js';
import Item from './componants/item/item.js';
import Register from './componants/register/Register.js';
import Login from './componants/login/Login.js';
import Dashbord from './componants/Dashbord/Dashbord.js';
import Admin from './componants/Admin/Admin.js';
import Cart from './componants/Cart/Cart'
import Orders from './componants/Orders/Orders';
import Profile from './componants/Profile/Profile';
import Buy from './componants/Cart/Buy/Buy';
import Reducer from './Reducer';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
export const ContextApi = createContext();
const Home = () => {
  return (
    <>
      <Slider />
      <Categories />
    </>
  )
}

function App() {

  const [User, setUser] = useState({})

  const initialState = {
    item: JSON.parse(localStorage.getItem('products')),
    totalAmount: 0,
    totalItem: 0,
    User:"user"
  }

  const [state, dispatch] = useReducer(Reducer, initialState);

  const clearCart = () => {
    return dispatch({ type: "CLEAR_CART" });
  };

  const removeItem = (_id) => {
    return dispatch({ type: "REMOVE_ITEM", payload: _id });
  };

  const increment = (_id) => {
    return dispatch({ type: "INCREMENT", payload: _id});
  };

  const decrement = (_id, curr) => { return dispatch({ type: "DECREMENT",payload:_id});};

  const userFunc = async () => {
    const res = await fetch('/api/users', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
    const data = await res.json();
    setUser(data[0])
  }

  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
    userFunc()
  }, [state.item]);
  
  return (
    <>
      <Router>
        <Navbar />
        <ContextApi.Provider value={{ ...state,User, clearCart, removeItem, increment, decrement }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/products/:id' component={Products} />
            <Route path='/product/:id' component={Item} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/dashbord' component={Dashbord} />
            <Route path='/admin' component={Admin} />

            <Route path='/cart' component={Cart} />
            <Route path='/orders' component={Orders} />
            <Route path='/profile' component={Profile} />
            <Route path='/buy' component={Buy} />
            <Route component={NotFound} />
          </Switch>
        </ContextApi.Provider>
        <Footer />
      </Router>
    </>
  );
}

export default App;


