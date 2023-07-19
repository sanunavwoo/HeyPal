import { useContext, useState } from "react";
import {useNavigate,NavLink} from "react-router-dom";

import { Navigation } from "../../component/NavBar/Navigation";
import { AuthContext } from "../../contexts/AuthContext";
import { loginService } from "../../services/loginServce";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./Login.css";



export function Login(){

    const [username,setUsername]=useState("");
    const [loginPassword,setLoginPassword]=useState("");

    const {stateAuth,dispatchAuth}= useContext(AuthContext);
    

    const navigate=useNavigate();

    function handleLogin(){
        if(username ==="" || loginPassword ===""){
            alert("Please fill all fields");
           
        }
        else{
            
            loginService(username,loginPassword,dispatchAuth);
        
        }   
    }
    console.log(stateAuth);
    if(stateAuth.isAuth===true){
        navigate("/");
    }

    return(
        <div>
        <Navigation />
            <div className="login-container">

                {/* <div className="login-left">
                    <div className="login-left-details">
                        <p>DON'T MISS A CHANCE TO SAY Hey</p>
                    </div>
                </div>
                <div className="login-right"> */}
                    <div className="login-div">

                        <div className="login-div-left">
                            <div>
                                <h1>Welcome Back!</h1>
                                <p>Enter your login details to start exploring</p>
                            </div>
                        </div>
                        <div className="login-div-right">
                            <h1>Log In</h1>
                            <div className="password-wrapper">
                                <input type="text" onChange={(e)=>setUsername(e.target.value)} value={username} placeholder="Enter Username" required />
                            
                            </div>
                            <div className="password-wrapper">
                                <input type="password" onChange={(e)=>setLoginPassword(e.target.value)} value={loginPassword} placeholder="Enter Password" required />
                                {/* <span onClick={()=>setIsVisible(!isVisible)}>
                                    {isVisible? <VisibilityIcon /> : <VisibilityOffIcon /> }
                                </span> */}
                            </div>
                            <button onClick={()=>handleLogin()}>Submit</button>
                            <button onClick={()=>loginService("adarshbalika","adarshBalika123",dispatchAuth)}>Login as Guest</button>
                            <p>Dont have an account? <NavLink to="/signup">Create one</NavLink></p>
                        </div>    
                    </div>
                {/* </div>     */}
                <ToastContainer autoClose={700} />
            </div>
           
        </div>
    );
}