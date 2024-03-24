import React, {useState} from "react";
import './SignUpForm.css'; // Assuming you have a separate CSS file for styling
import { FaUserAlt, FaLock, FaEnvelope} from "react-icons/fa";

const SignUpForm = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");

    const handleSignup = (e) => {
        e.preventDefault();
        console.log("Signup username:", username, "password:", password);
    }
    return (
        <div className="wrapper">
            <form onSubmit={handleSignup}>
                <h1>Sign Up</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)} required></input>
                    <FaUserAlt className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}required></input>
                    <FaLock className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}required></input>
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
