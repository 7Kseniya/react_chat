import React, {useEffect, useState} from "react";
import { useAuth } from "../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {

    const {user, handleUserLogin} = useAuth()
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        email:'',
        password:''
    })

    useEffect(() => {
        if(user) {
            navigate('/')
        }
    }, [])

    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setCredentials({...credentials, [name]:value})
        // [name] так как name динамически изменяющаяся переменная
        console.log(credentials)
    }
    return (
        <div className="auth--container">
            <div className="form--wrapper">
                <form onSubmit={(e) => handleUserLogin(e, credentials)}>
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
                        name="password"
                        placeholder="enter your password"
                        value={credentials.password}
                        onChange={handleInputChange}/>
                    </div>
                    <div className="field--wrapper">
                        <input 
                        className= "btn btn--lg btn--main" 
                        type="submit" 
                        value="Login"/>
                    </div>
                </form>
                <div className="redirection">
                    <Link className="redirection-btn" to={"/register"}> register</Link> 
                    <Link className="prompt" to={"/register"}>click here if you are already registered</Link>
                </div>                
                
            </div>

        </div>
    )
}

export default LoginPage