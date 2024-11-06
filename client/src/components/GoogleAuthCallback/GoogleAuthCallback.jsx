import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Loader from '../Loader/Loader';


export default function GoogleAuthCallback() {
  const {updateLogin} = useContext(AuthContext)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const code = searchParams.get('code');
  console.log("code", code);
  const fetchData = async () => {
    try {
      let res = await axios.get(`/user/auth/google/verify?code=${code}`);
      console.log(res);
      updateLogin()
      navigate('/');
    } catch (err) {
      console.log(err);
      // toast.error(err?.response?.data?.message ?? "Internal Server Error");
      navigate('/login');
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className='div-center'>
      <Loader />
      {/* <button onClick={async ()=>{
        let userRes = await axios.get(`/user`);
        console.log(userRes);

      }}>Check token</button> */}
    </div>
  )
}