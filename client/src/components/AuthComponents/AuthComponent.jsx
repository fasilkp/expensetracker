import React from 'react';
import HomePage from '../../pages/HomePage';
import { Navigate } from 'react-router-dom';

export default function AuthComponent({loggedIn, Component}) {
  return (
    loggedIn===true ? <Navigate to={"/"} /> : loggedIn===false ? <Component /> : <b>Loading...</b>
)}