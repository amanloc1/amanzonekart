import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Navbar() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
    }
    return (
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
            <span className="Shop-by-category">Shopping Categories</span>
            <div onClick={closeNav}>
                <Link to="/category/Pants">Pants</Link>
                <Link to="/category/Shirts">Shirts</Link>
            </div>
        </div>
    )
}

export default Navbar
