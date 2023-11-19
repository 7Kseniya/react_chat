import React, {useState} from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    const {handleUserRegister} = useAuth()

    const [credentials, setCredentials] = useState({
        name:'',
        email:'',
        password1:'',
        password2:''

    })
    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setCredentials({...credentials, [name]:value})
        console.log(credentials)
    }

    return (
        <div className="auth--container">
            <div className="form--wrapper">
                <form onSubmit={(e) => handleUserRegister(e, credentials)}>
                    <div className="field--wrapper">
                        <label>User name:</label>
                        <input 
                        type="text"
                        required
                        name="name"
                        placeholder="enter your name"
                        value={credentials.name}
                        onChange={handleInputChange}/>
                    </div>
                    <div className="field--wrapper">
                        <label>Email:</label>
                        <input 
                        type="email"
                        required
                        name="email"
                        placeholder="enter your email"
                        value={credentials.email}
                        onChange={handleInputChange}/>
                    </div>
                    <div className="field--wrapper">
                        <label>Password:</label>
                        <input 
                        type="password"
                        required
                        name="password1"
                        placeholder="enter your password"
                        value={credentials.password1}
                        onChange={handleInputChange}/>
                    </div>
                    <div className="field--wrapper">
                        <label>Confirm password:</label>
                        <input 
                        type="password"
                        required
                        name="password2"
                        placeholder="confirm your password"
                        value={credentials.password2}
                        onChange={handleInputChange}/>
                    </div>
                    <div className="field--wrapper">
                        <input 
                        className= "btn btn--lg btn--main" 
                        type="submit" 
                        value="Register"/>
                    </div>
                </form>
                <div className="redirection">
                    <Link className="redirection-btn" to={"/login"}> login</Link> 
                    <Link className="prompt" to={"/login"}>click here if you are not registered yet</Link>
                </div>        
                
                
            </div>


        </div>
    )
}

export default RegisterPage