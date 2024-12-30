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


axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "https://expensetrackerapi.fsweb.store/api"

function App() {
  console.log("app running 1.2" , process.env);
  console.log("builde time", process.env.REACT_APP_BUILD_DATE);
  const { loggedIn, updateLogin } = useContext(AuthContext);
  useEffect(() => {
    updateLogin();
  }, [])
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProtectedComponent Component={HomePage} loggedIn={loggedIn} />} />
          <Route path="/list" element={<ProtectedComponent Component={ListPage} loggedIn={loggedIn} />} />
          <Route path="/category" element={<ProtectedComponent Component={CategoryPage} loggedIn={loggedIn} />} />
          <Route path="/analysis" element={<ProtectedComponent Component={AnalysisPage} loggedIn={loggedIn} />} />

          <Route path="/user/auth/google/callback" element={<AuthComponent Component={GoogleAuthCallback} loggedIn={loggedIn} />} />
          <Route path="/login" element={<AuthComponent Component={LoginPage} loggedIn={loggedIn} />} />
        </Routes>
        {
          loggedIn === null && <>
            <Loader /></>
        }
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
