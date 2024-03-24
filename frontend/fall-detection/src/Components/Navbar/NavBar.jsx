import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
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
                <li onClick={()=>{setMenu("aboutus")}}><Link style = {{ textDecoration: 'none'}} to='/aboutus'>About us</Link>{menu==="aboutus"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("something1")}}><Link style = {{ textDecoration: 'none'}} to='/something1'>Something 1</Link>{menu==="something1"?<hr/>:<></>}</li>
            </ul>

            <div className="nav-login">
                <Link to = '/login'><button>Login</button></Link>
                <Link to ='./signup'><button>Signup</button></Link>

            </div>
        </div>
    );
};
export default NavBar;