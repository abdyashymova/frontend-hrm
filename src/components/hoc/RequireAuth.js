import React from "react";
import {Navigate} from "react-router-dom";
import {parseJwt} from "../../helpers";
import AuthService from "../../services/auth.service"

export const RequireAuth = ({children}) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      const decodedJwt = parseJwt(user.access_token);

      if (new Date() >= new Date(decodedJwt.exp * 1000)) {
          AuthService.logout();
          return <Navigate to='/login?status=1'/>
       }
    }

    if (!user || !user.access_token){
        return <Navigate to='/login'/>
    }

    return children;
}