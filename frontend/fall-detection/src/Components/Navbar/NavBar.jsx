import React, { useState } from "react";
import './NavBar.css'

import logo from '../Assets/logo.png'
const NavBar = () => {
    const[menu, setMenu] = useState("aboutus");
    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt=""></img>
                <p>Team name</p>
            </div>
            <ul className="nav-menu">
                <li onClick={()=>{setMenu("aboutus")}}>About us{menu==="aboutus"?<hr/>:<></>}</li>
            </ul>

            <div className="nav-login">
                <button>Login</button>

            </div>
        </div>
    );
};
export default NavBar;