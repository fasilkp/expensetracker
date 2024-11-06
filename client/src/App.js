import React, { useEffect, useContext } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import ListPage from './pages/ListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios'
import AuthContext from './context/AuthContext';
import CategoryPage from './pages/CategoryPage';
import AnalysisPage from './pages/AnalysisPage';
import DemoLoginPage from './pages/DemoLoginPage';
import Loader from './components/Loader/Loader';
import GoogleAuthCallback from './components/GoogleAuthCallback/GoogleAuthCallback';
import ProtectedComponent from './components/ProtectedComponent/ProtectedComponent';
import toast, { Toaster } from 'react-hot-toast';
import AuthComponent from './components/AuthComponents/AuthComponent';
axios.defaults.withCredentials = true;

window.toast = toast;

axios.defaults.baseURL = "http://localhost:8080/api"
// axios.defaults.baseURL = "https://expensetrackerbackend.onrender.com/api"

function App() {
  console.log("app running 1.1")
  const { loggedIn, updateLogin } = useContext(AuthContext);
  useEffect(() => {
    updateLogin();
  }, [])
  return (
    <Router>
      <div className="App">
        {/* {
          loggedIn && */}
        <Routes>
          <Route path="/" element={<ProtectedComponent Component={HomePage} loggedIn={loggedIn} />} />
          <Route path="/list" element={<ProtectedComponent Component={ListPage} loggedIn={loggedIn} />} />
          <Route path="/category" element={<ProtectedComponent Component={CategoryPage} loggedIn={loggedIn} />} />
          <Route path="/analysis" element={<ProtectedComponent Component={AnalysisPage} loggedIn={loggedIn} />} />

          <Route path="/user/auth/google/callback" element={<AuthComponent Component={GoogleAuthCallback} loggedIn={loggedIn} />} />
          <Route path="/login" element={<AuthComponent Component={LoginPage} loggedIn={loggedIn} />} />
          {/* <Route path="/register" element={<AuthComponent Component={RegisterPage} loggedIn={loggedIn} />}/> */}
          {/* <Route path="/demo-login" element={<AuthComponent Component={DemoLoginPage} loggedIn={loggedIn} />} /> */}

        </Routes>
        {/* // }
        // {loggedIn === false && */}
        {/* <Routes>
            <Route path="/demo-login" element={<DemoLoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<LoginPage />}/>
          </Routes> */}
        {/* {/* // } */}
        {
          loggedIn === null && <>
            <b>⏳⏳⏳</b>
            <Loader /></>
        }
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
