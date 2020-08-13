import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
function Header() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
    }
    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
    }
    return (
        <>
            <header className="header" >
                <div className="brand">
                    <button onClick={openNav}>
                        &#9776;
                    </button>
                    <Link to="/" onClick={closeNav}><span id="brandName">AmanZoneKart</span></Link>
                </div>
                <div className="header-links" onClick={closeNav}>
                    {userInfo ? (
                        <Link to="/cart" id="cartText" style={{ marginTop: "2rem" }}>Cart</Link>
                    ) :
                        (
                            <Link to="/cart" id="cartText" style={{ marginTop: "0.8rem" }}>Cart</Link>
                        )}

                    {userInfo ? (
                        <Link to="/profile" style={{paddingTop:"10px"}}>
                            <span>
                                <span>
                                    Hello
                                    </span>
                                    <br></br>
                                <span style={{ fontSize: "10px" }}>
                                    {userInfo.firstName}
                                </span>
                                    
                            </span>
                        </Link>
                    ) : (
                            <Link to="/signin" style={{ marginTop: "0.8rem" }}>Sign In</Link>
                        )}
                    {userInfo && userInfo.isAdmin && (
                        <div className="dropdown">
                            <button className="dropbtn">Admin</button>
                            <div className="dropdown-content">
                                <Link to="/orders">Manage Orders</Link>
                                <Link to="/products">Manage Product</Link>
                            </div>
                        </div>
                    )}
                </div>
            </header>
            <Navbar />
        </>
    )
}

export default Header
