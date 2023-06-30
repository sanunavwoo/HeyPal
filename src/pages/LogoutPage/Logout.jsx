import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export function Logout(){

    const {stateAuth,dispatchAuth}= useContext(AuthContext);
    
    const navigate=useNavigate();

    dispatchAuth({
        type: 'USER_LOGOUT',
        payload: {
            user: [],
            token: null,
            isAuth: false 
        }
    });


    localStorage.removeItem("loginDetails");
   

    if(stateAuth.isAuth===false){
        navigate("/");
    }
    console.log("STATE AFTER LOGUT::", stateAuth.userDetails);
    return(
        <>
            <div>
                <h1>
                    Logging out...
                </h1>

            </div>
        </>
    );
}