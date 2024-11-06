import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedComponent({loggedIn, Component}) {
  return (
    loggedIn===false ? <Navigate to='/login' /> : loggedIn===true ? <Component /> : <b>Loading...</b>
)}