import React, { useState } from "react";
import './LoginForm.css';
import { FaUserAlt, FaLock} from "react-icons/fa";
import Validation from './LoginValidation'
const LoginForm = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({})
    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]:[e.target.value]}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(Validation(values));
    }
    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" onChange={handleInput} name = 'username' required></input>
                    <FaUserAlt className="icon"/>
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" onChange={handleInput} name = 'password' required></input>
                    <FaLock className="icon"/>
                </div>

                <div className="remember-forgot">
                    <lable><input type="checkbox"/>Remember me? </lable>
                    <a href = "#">Forgot password</a>
                    {errors.password && <span className="text-danger">{errors.password}</span>}
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