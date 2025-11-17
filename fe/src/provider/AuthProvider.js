import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/Customer/MyDashboard";
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log("sessionStorage [userAuthDetails]", sessionStorage.getItem("userAuthDetails"));
    const storedUserDetails = sessionStorage.getItem("userAuthDetails");
  
    if (storedUserDetails !== null) {
      setUser(JSON.parse(storedUserDetails));
    }
  }, []);

  useEffect(()=>{
    console.log("user [userAuthDetails]", user);
  },[user]);

  const login = (userAuthDetails) => {
    setUser( userAuthDetails );
    sessionStorage.setItem("userAuthDetails", JSON.stringify(userAuthDetails));
    navigate(redirectPath, { replace: true });
  };
  const logout = () => {
    setUser({});
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
