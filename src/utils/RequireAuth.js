import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";

export const RequireAuth = ({ children }) => {
  let localToken = localStorage.getItem("token");
  const location = useLocation();
  const auth = useAuth();

  let tokenOk = null;
  if (localToken) tokenOk = auth.verifyToken(localToken);

  if (!auth.loggedIn || !tokenOk) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};
