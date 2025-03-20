import './LoginForm.css';
import { FaUserAlt, FaLock} from "react-icons/fa";
import React, {useState} from "react";
import axios from 'axios';

const LoginForm = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleLogin = async (e) => {
        console.log("Get into handle log in")
        e.preventDefault()
        try {
            console.log("Submitting:", {email, password });
            const result = await axios.post('http://localhost:5000/api/users/login', {email, password});
            console.log("Success:", result.data);
            // Add user feedback here (redirect or success message)
        } catch (err) {
            console.log("Error:", err.response?.data || err.message);
            // Add error feedback to the user
        }
    }
    return (
        <div className="wrapper">
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} name = 'email' required></input>
                    <FaUserAlt className="icon"/>
                </div>

                <div className="input-box">
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} name = 'password' required></input>
                    <FaLock className="icon"/>
                </div>

                <button type="submit">Login</button>
                
            </form>
        </div>
    );
};
export default LoginForm;