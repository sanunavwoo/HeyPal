import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {Navigate, useLocation} from "react-router-dom";

export function PrivateRoute({children}){
    const {stateAuth}= useContext(AuthContext);
    
    const location= useLocation();

    return stateAuth.isAuth? (
        children
      ) : (
        <Navigate to="/login" state={{from: location}} replace />
      );
    
}