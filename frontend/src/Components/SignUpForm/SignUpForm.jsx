import React, {useState} from "react";
import { useSignup } from "../../hooks/useSignUp";
import './SignUpForm.css'; // Assuming you have a separate CSS file for styling
import { FaUserAlt, FaLock} from "react-icons/fa";
import axios from 'axios';

const SignUpForm = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const {signup, isLoading, error} = useSignup()


    // Take an event object as e
    // Context: Used on the client-side (browser) or in Node.js when making requests
    // Purpose: Sends HTTP POST requests to servers
    // Creates and sends a POST request to the server 

    const handleSignup = async (e) => {// Prevents the default form submission behavior
        await signup(username, email, password);
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
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required></input>
                    {/* <FaUserAlt className="icon"/> */}
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}required></input>
                    <FaLock className="icon"/>
                </div>
     
                <button type="submit" disabled={isLoading}>Sign Up</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default SignUpForm;
