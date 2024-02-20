import axios from "axios";
import { useState, createContext, useContext } from "react";
import { apiUrl } from "../data/env";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkLoggedIn, setCheckLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  const login = (token, userObj) => {
    // localStorage.setItem("token", token);
    setToken(token);
    setRole(userObj.role);
    setUsername(userObj.name);
    setEmail(userObj.email);
    setLoggedIn(true);
  };

  const logout = () => {
    // localStorage.setItem("token", null);
    setToken(null);
    setRole(null);
    setUsername(null);
    setEmail(null);
    setLoggedIn(false);
  };

  const verifyToken = (token) => {
    // axios.get(`${apiUrl}/api/v1/users/verifyToken`).then(res => {
    //   console.log(res);
    // }).catch(err => console.log(err));
    setTimeout(() => {
      localStorage.setItem("token", token);
      setLoggedIn(true);
      return true;
    }, 3500);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        token,
        role,
        username,
        email,
        login,
        logout,
        verifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
