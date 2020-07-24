import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';

import { BrowserRouter, Route, Link } from 'react-router-dom';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';

function App() {

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    // console.log(userInfo);

    const openNav = () => {
        // console.log("navopen");
        document.getElementById("mySidenav").style.width = "250px";
        // document.getElementById("main").style.marginLeft = "180px";
        // document.getElementById("brandName").style.marginLeft = "200px";

    }
    const closeNav = () => {
        // console.log("navclose");
        document.getElementById("mySidenav").style.width = "0";
        // document.getElementById("main").style.marginLeft = "0";
        // document.getElementById("brandName").style.marginLeft = "0";

    }
    return (
        <BrowserRouter>
            <div className="grid-container" >
                {/* <!-- Header Starts --> */}
                <header className="header" >
                    <div className="brand">
                        {/* <button style={{fontSize:"30px" ,cursor:"pointer"}} onClick={openNav}> */}
                        <button onClick={openNav}>
                            &#9776;
                    </button>
                        <Link to="/" onClick={closeNav}><span id="brandName">AmanZoneKart</span></Link>
                        {/* <a href="index.html">AmanZoneKart</a> */}
                    </div>
                    <div className="header-links" onClick={closeNav}>
                        {userInfo ? (
                            <Link to="/cart" id="cartText" style={{ marginTop: "2rem" }}>Cart</Link>
                        ) :
                            (
                                <Link to="/cart" id="cartText" style={{ marginTop: "0.8rem" }}>Cart</Link>
                            )}

                        {userInfo ? (
                            <Link to="/profile">
                                <ul style={{ listStyleType: "none" }}>
                                    <li>
                                        Hello
                                    </li>
                                    <li style={{ fontSize: "10px" }}>
                                        {userInfo.firstName}
                                    </li>
                                </ul>
                            </Link>
                        ) : (
                                <Link to="/signin" style={{ marginTop: "0.8rem" }}>Sign In</Link>
                            )}
                        {userInfo && userInfo.isAdmin && (
                            <div className="dropdown">
                                <button class="dropbtn">Admin</button>
                                <div class="dropdown-content">
                                    <Link to="/orders">Manage Orders</Link>
                                    <Link to="/products">Manage Product</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </header>
                {/* <!-- Header Ends -->

<!-- SideBar Starts --> */}
                <div id="mySidenav" className="sidenav">
                    <span className="closebtn" onClick={closeNav}>
                        <span className="closeText">Close</span>
                        &times;
                    </span>
                    <div onClick={closeNav}>
                        {userInfo ? (
                            <Link to="/profile">Hello! {userInfo.firstName}</Link>
                        ) : (
                                <Link to="/signin">Sign In/ Register</Link>
                            )}

                    </div>
                    <span class="Shop-by-category">Shopping Categories</span>
                    <div onClick={closeNav}>
                        <Link to="/category/Pants">Pants</Link>
                        <Link to="/category/Shirts">Shirts</Link>
                    </div>


                </div>
                {/* <!-- SIDE BAR ENDS --> */}

                <main id="main" className="main" onClick={closeNav}>
                    <div className="content">
                        <Route path="/orders" component={OrdersScreen} />
                        <Route path="/profile" component={ProfileScreen} />
                        <Route path="/order/:id" component={OrderScreen} />
                        <Route path="/products" component={ProductsScreen} />
                        <Route path="/shipping" component={ShippingScreen} />
                        <Route path="/payment" component={PaymentScreen} />
                        <Route path="/placeorder" component={PlaceOrderScreen} />
                        <Route path="/signin" component={SigninScreen} />
                        <Route path="/register" component={RegisterScreen} />
                        <Route path="/product/:id" component={ProductScreen} />
                        <Route path="/cart/:id?" component={CartScreen} />
                        <Route path="/category/:id" component={HomeScreen} />
                        <Route path="/" exact={true} component={HomeScreen} />
                    </div>
                </main>
                <footer className="footer">
                    All rights reserved.
            </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
