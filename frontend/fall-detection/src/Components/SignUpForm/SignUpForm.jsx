import React from "react";
import './SignUpForm.css'; // Assuming you have a separate CSS file for styling
import { FaUserAlt, FaLock, FaEnvelope} from "react-icons/fa";

const SignUpForm = () => {
    return (
        <div className="wrapper">
            <form action="">
                <h1>Sign Up</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required></input>
                    <FaUserAlt className="icon"/>
                </div>
                <div className="input-box">
                    <input type="email" placeholder="Email" required></input>
                    <FaEnvelope className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required></input>
                    <FaLock className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Confirm Password" required></input>
                    <FaLock className="icon"/>
                </div>
                <button type="submit">Sign Up</button>
                
                <div className="login-link">
                    <p>Already have an account? <a href="#">Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
