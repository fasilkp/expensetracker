import React, { useContext, useState } from 'react'
import './Login.css'
import LoginImage from '../../images/login-image.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import Loader from '../Loader/Loader'
import { FcGoogle } from 'react-icons/fc'
import toast from 'react-hot-toast';
function Login() {

    const { updateLogin } = useContext(AuthContext)
    const [load, setLoad] = useState(false)
    const navigate = useNavigate();

    const handleGoogleLogin = async (e) => {
        e.preventDefault()
        let redirectUri = window.location.origin+"/user/auth/google/callback"
        // let redirectUri = "http://localhost:3000/user/auth/google/callback"
        let clientId = "572510792166-vpf7ki1vmt5t7u4er1afdsgn7oe1l1l9.apps.googleusercontent.com"
        try {
            window.open(
                `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email%20profile`,
                "_self"
            )
        } catch (error) {
            console.log('Google login error:', error);
            toast.error(error?.response?.data?.message ?? "Internal Server Error")
        }
    };
    const handleDemoLogin = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.get("/user/auth/demo");
            updateLogin()
            navigate("/")
        }catch(err){
            console.log(err)
            toast.error(err?.response?.data?.message ?? "Demo Login failed")
        }
    };
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
                    <button onClick={handleDemoLogin}>
                        Demo Login
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