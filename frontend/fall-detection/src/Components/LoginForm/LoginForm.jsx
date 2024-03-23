import React from "react";
import './LoginForm.css';
import { FaUserAlt, FaLock} from "react-icons/fa";

const LoginForm = () => {
    return (
        <div className="wrapper">
            <form action ="">
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required></input>
                    <FaUserAlt className="icon"/>

                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required></input>
                    <FaLock className="icon"/>
                </div>

                <div className="remember-forgot">
                    <lable><input type="checkbox"/>Remember me? </lable>
                    <a href = "#">Forgot password</a>
                </div>
                <button type = "submit">Login</button>
                
                <div className="register-link">
                    <p>Don't have an account? <a href = "#">Register</a></p>
                </div>
            </form>
        </div>
    );
};
export default LoginForm;