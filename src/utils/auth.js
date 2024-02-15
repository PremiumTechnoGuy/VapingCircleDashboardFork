import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [userName, setUserName] = useState(null);

  const login = (user) => {
    setUser(true);
    setUserName(user);
  };

  const logout = () => {
    setUser(false);
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ user, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
