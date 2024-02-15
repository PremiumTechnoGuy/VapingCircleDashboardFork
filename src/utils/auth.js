import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  const login = (token, role) => {
    // localStorage.setItem("token", token);
    setToken(token);
    setRole(role);
    setLoggedIn(true);
  };

  const logout = () => {
    // localStorage.setItem("token", null);
    setToken(null);
    setRole(null);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
