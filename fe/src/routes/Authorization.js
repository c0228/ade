import React, { useState, useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Unauthorized from "@Pages/UnAuthorized/index.js";
import { useAuth } from "@Provider/AuthProvider";

const Authorization = ({ permissions }) => {
  const { user } = useAuth();
  const [ userAuthData, setUserAuthData ] = useState();
  useEffect(() => {
    console.log("user [Authorization]", user);
    if(user?.data?.length>0) {
      setUserAuthData( JSON.parse( user?.data ) );
    }
  }, [user]);

  const location = useLocation();
  if (userAuthData?.userRole) {
    const userpermission = [userAuthData?.userRole];
    const isAllowed = permissions.some((allowed) =>
      userpermission.includes(allowed)
    );
    return isAllowed ? <Outlet /> : <Unauthorized />;
  }
 // return <Navigate to='/App/Authentication' state={{ path: location.pathname }} replace />;
};

export default Authorization;
