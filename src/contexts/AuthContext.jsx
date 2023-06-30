import { createContext, useReducer } from "react";
import { authReducerFunc } from "../reducers/AuthReducer";

export const AuthContext= createContext();

export function AuthContextProvider({children}){

    const localStorageToken= localStorage.getItem("loginDetails");

    const token= localStorageToken?.token;

    const [stateAuth,dispatchAuth]= useReducer(authReducerFunc,{
        userDetails:[],
        token: token?? null,
        isAuth: token? true:false
    })
    return(
        <AuthContext.Provider value={{stateAuth,dispatchAuth}} >
            {children}
        </AuthContext.Provider>
    );
}