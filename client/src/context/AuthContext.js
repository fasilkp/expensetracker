import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn]=useState(null)
  const [reloadPage, setReloadPage]=useState(false)

  async function updateLogin() {
    try{
      const loggedInRes = await axios.get("/user");
      console.log(loggedInRes)
      setUser(loggedInRes.data);
      setLoggedIn(loggedInRes.data ? true : false);
      return loggedInRes.data;
    }catch(err){
      // toast.error(err?.response?.data?.message ?? "Internal Server Error")
      console.log("Error: " + err.message);
      setUser(null);
      setLoggedIn(false)
    }
  }

  // useEffect(() => {
  //   updateLogin();
  // }, []);

  return (
    <AuthContext.Provider value={{ user, updateLogin, loggedIn, reloadPage, setReloadPage }}>
      {props.children}
    </AuthContext.Provider>
  );
}


export default AuthContext;
export { AuthContextProvider }