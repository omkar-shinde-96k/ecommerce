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

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const Home = () => {
  return (
    <>
      <Slider />
      <Categories />
    </>
  )
}

function App() {
  return (
    <>
      <Router>
        <Navbar />
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
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;


