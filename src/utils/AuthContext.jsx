import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwriteConfig";
import { ID } from "appwrite";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getUserOnLoad()
    }, [])

    const getUserOnLoad = async () => {
        try {
            const accountInfo = await account.get() 
            console.log('account info:', accountInfo)
            setUser(accountInfo)

        } catch(error) {
            console.info(error)
        }
        setLoading(false)
    }

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault()
        try {
            let response = await account.createEmailSession(credentials.email, credentials.password)
            console.log('logged:', response)
            let accountInfo = await account.get() 
            console.log('account info:', accountInfo)
            setUser(accountInfo)

            navigate('/')
        } catch(error) {
            console.error(error)
        }
    }

    const handleUserLogout = async () => {
        await account.deleteSession('current')
        console.log('logout')
        setUser(null)
    }

    const handleUserRegister = async (e, credentials) => {
        e.preventDefault()
        if(credentials.password1 !== credentials.password2) {
            alert('password does not match')
            return
        }

        try {
            let response = await account.create(
                ID.unique(), 
                credentials.email, 
                credentials.password1,
                credentials.name
                )

            await account.createEmailSession(credentials.email, credentials.password1)

            let accountInfo = await account.get()
            console.log('accounnt info:', accountInfo)
            setUser(accountInfo)
            console.log('registred:', response)
            navigate('/')
        } catch(error) {
            console.error(error)
        }
    }

    const contextData = {
        user,
        handleUserLogin,
        handleUserLogout, 
        handleUserRegister
    }

    return <AuthContext.Provider value={contextData}>
        {loading ? <p>loading...</p> : children}

    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext