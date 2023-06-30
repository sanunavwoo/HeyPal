export function authReducerFunc(stateAuth,actionAuth){
    switch(actionAuth.type){
        case "GET_USER_DETAILS":
            return {...stateAuth, userDetails:[actionAuth.payload.user], token:actionAuth.payload.token, isAuth:true };
        
        case "USER_LOGOUT":
            return {...stateAuth, userDetails:[actionAuth.payload.user], token:actionAuth.payload.token, isAuth: actionAuth.payload.isAuth  };
        
        case "CREATE_USER":
            return {...stateAuth, userDetails:[actionAuth.payload.user], token: actionAuth.payload.token,isAuth:true}; 

        case "FOLLOW_USER":
            return {...stateAuth, userDetails:[actionAuth.payload.user]}    
        default: return stateAuth;

    }
}