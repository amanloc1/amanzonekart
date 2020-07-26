import React from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';

import { browserHistory, Route, Switch, BrowserRouter } from 'react-router-dom';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import My404Component from './components/My404Component';

function App() {
    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
    }

    return (
        <BrowserRouter >
            <div className="grid-container" >
                <Header />
                <main id="main" className="main" onClick={closeNav}>
                    <div className="content">
                        <Switch>
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
                            <Route path="*" component={My404Component} />
                        </Switch>
                    </div>
                </main>
                <Footer />
            </div>
        </BrowserRouter >
    );
}

export default App;
