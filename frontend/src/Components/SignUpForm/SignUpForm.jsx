import React, {useState} from "react";
import './SignUpForm.css'; // Assuming you have a separate CSS file for styling
import { FaUserAlt, FaLock} from "react-icons/fa";
import axios from 'axios';

const SignUpForm = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    // const [form, setForm] = useState({
    //     'username': '',
    //     'password': '',
    //     'email': ''
    // });

    // Take an event object as e
    // Context: Used on the client-side (browser) or in Node.js when making requests
    // Purpose: Sends HTTP POST requests to servers
    // Creates and sends a POST request to the server 

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            console.log("Submitting:", { username, password, email});
            const result = await axios.post('http://localhost:5000/api/users/', {username, password, email});
            console.log("Success:", result.data);
            // Add user feedback here (redirect or success message)
        } catch (err) {
            console.log("Error:", err.response?.data || err.message);
            // Add error feedback to the user
        }
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
     
                <button type="submit">Sign Up</button>
            {/*                 
                <div className="login-link">
                    <p>Already have an account? <a href="#">Login</a></p>
                </div> 
            */}
            </form>
        </div>
    );
};

export default SignUpForm;
