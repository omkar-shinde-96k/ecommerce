
// import React, { useState, useEffect } from 'react';
// import './Dashbord.scss';

// import {
//     // useHistory,
//     NavLink,
//     BrowserRouter as Router,
//     Switch,
//     Route,
// } from 'react-router-dom'
// import Cart from '../Cart/Cart'
// import Orders from '../Orders/Orders';
// import Profile from '../Profile/Profile';

// const Dashbord = () => {

//     const [GetData, setGetData] = useState([])

//     useEffect(() => {
//         fetch('/api/users/orders', {
//             headers: {
//                 "Authorization": "Bearer " + localStorage.getItem("jwt")
//             }
//         }).then(res => res.json())
//             .then(result => {

//                 setGetData(result[0].user.name)
//                 if (result[0].error) {
//                     // history.push("/login")
//                     window.alert("error")
//                 }
//             }).catch(err => {
//                 console.log(err)
//             })
//     }, [GetData])


//     return (
//         < > 

//             {/* <div className="header">
//                 <div className="menu">&nbsp;   <i class="fa fa-bars"></i> </div>

//                 <div className="profile">
//                     <img src="https://images-na.ssl-images-amazon.com/images/I/51IIMW6-TbL.jpg" alt="profile pic" height="100%" width="100%"></img>
//                     <NavLink className="navlink" to="/dashbord/profile">
//                         <div className="username"> &nbsp; {GetData}</div>
//                     </NavLink>
//                 </div>
//             </div> */}

//             <div className="dashbord">
//                 <div className="row">

//                     {/* <div className="sidebar col-xl-2">
//                         <NavLink to="/dashbord">My Cart </NavLink>
//                         <NavLink to="/dashbord/orders">My Orders</NavLink>
//                         <NavLink to="/dashbord/profile">Profile</NavLink>
//                         <NavLink to="/cart">My Wishlist</NavLink> 
//                     </div> */}

//                     <div className="main col-xl-10">
//                         <Switch>
//                             {/* <Route exact path='/dashbord' component={Cart} /> */}
//                             <Route path='/cart' component={Cart} />
//                             <Route path='/orders' component={Orders} />
//                             <Route path='/profile' component={Profile} />
//                             {/* <Route component={NotFound} /> */}
//                         </Switch>
//                     </div>

//                     <div className="proceedToCheckout col-xl-2">
//                         <div className="buy"> <NavLink to={() => {
//                             return `/dashbord/cart/buy/`
//                         }}>BUY NOW</NavLink></div>
//                     </div>

//                 </div>
//             </div>


//         </>
//     )
// }

// export default Dashbord;
