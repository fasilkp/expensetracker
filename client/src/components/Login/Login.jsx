import React, { useContext, useState } from 'react'
import './Login.css'
import LoginImage from '../../images/login-image.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import Loader from '../Loader/Loader'
import { FcGoogle } from 'react-icons/fc'
function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { updateLogin } = useContext(AuthContext)
    const [load, setLoad] = useState(false)
    const navigate = useNavigate();
    const handleEmail = e => {
        setEmail(e.target.value)
    }
    const handlePassword = e => {
        setPassword(e.target.value)
    }
    const handleGoogleLogin = async (e) => {
        e.preventDefault()
        // let redirectUri = process.env.REACT_APP_SERVER_URL+"/user/auth/google"
        let redirectUri = "http://localhost:3000/user/auth/google/callback"
        let clientId = "572510792166-vpf7ki1vmt5t7u4er1afdsgn7oe1l1l9.apps.googleusercontent.com"
        try {
            window.open(
                `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email%20profile`,
                "_self"
            )
        } catch (error) {
            console.log('Google login error:', error);
            toast.error(err?.response?.data?.message ?? "Internal Server Error")
        }
    };
    const handleSubmit = async e => {
        e.preventDefault();
        setLoad(true)
        if (email !== "" || password.length > 6) {
            try {
                const user = await axios.post("/auth/login", { email, password });
                updateLogin();

                if (user.data.login) {
                    updateLogin();
                    window.location.href = "/"
                }
                else {
                    alert(user.data.message);
                }

            } catch (err) {
                toast.error(err?.response?.data?.message ?? "Internal Server Error")

            } finally {
                setLoad(false)
            }
        }
        setLoad(false)
    }
    return (
        <>
        <nav className='login-nav'>
            Expense Tracker
        </nav>
            <div className="Login">
                <img src={LoginImage} alt="" />
                <div className='login-content'>
                    <b>Login to expense tracker</b>
                    <button onClick={handleGoogleLogin}>
                        <FcGoogle />
                        <div>Login with google</div>
                    </button>
                </div>
                {
                    load && <Loader />
                }
            </div>
        </>
    )
}

export default Login