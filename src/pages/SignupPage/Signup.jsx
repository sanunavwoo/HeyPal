import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { signupService } from "../../services/signupService";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import "./Signup.css"
import { Navigation } from "../../component/NavBar/Navigation";

export function Signup(){

    const navigate= useNavigate();

    const [firstName,setFirstName]= useState("");
    const [lastName,setLastName]= useState("");
    const [email,setEmail]= useState("");
    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");
    const [isPasswordVisible, setIsPasswordVisible]= useState(false);
    const [confirmPassword,setConfirmPassword]= useState('');
    
    const {stateAuth,dispatchAuth}= useContext(AuthContext);

    function handleSignUp(){
        if(firstName === "" || lastName=== "" || email==="" || username==="" || password===""){
            alert("Please fill all fields");
        }
        else if(password!==confirmPassword){
            // toast.error("Password mismatch");
            alert("Password mismatch");
        }
        else{
            signupService(firstName,lastName,email,username,password,dispatchAuth);
            
        }
    }
    console.log(stateAuth);
    if(stateAuth.isAuth===true){
        navigate("/");
    }


    return(
        <>
        <Navigation />
            <div className="login-container">
        
                <div className="login-div">

                    <div className="login-div-left">
                        <div>
                            <h1>Hey Pal</h1>
                            <p>Embrace your authenticity. Redifine your social story</p>
                        </div>
                    </div>
                    <div className="login-div-right">
                        <h1>Create New Account</h1>
                        <div className="password-wrapper">
                            <input onChange={(e)=>setFirstName(e.target.value)} required value={firstName} placeholder="Enter First Name"  />
                        </div>
                        <div className="password-wrapper">
                            <input onChange={(e)=>setLastName(e.target.value)} required value={lastName} placeholder="Enter Last Name" />
                        </div>
                        <div className="password-wrapper">
                            <input onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter Email" required />
                        </div>
                        <div className="password-wrapper">
                            <input onChange={(e)=>setUsername(e.target.value)} value={username} placeholder="Enter Username" required />
                        </div>
                        <div className="password-wrapper">
                            <input type={isPasswordVisible? "text":"password"} onChange={(e)=>setPassword(e.target.value)} value={password}  placeholder="Enter Password" required />
                            {/* <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}  placeholder="Enter Password" required /> */}
                            <span onClick={()=>setIsPasswordVisible(!isPasswordVisible)}>
                                {isPasswordVisible? <VisibilityIcon /> : <VisibilityOffIcon /> }
                        </span>
                        </div>

                        <div className="password-wrapper">
                            <input type={isPasswordVisible? "text":"password"} onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}  placeholder="Confrim Password" required />
                            <span onClick={()=>setIsPasswordVisible(!isPasswordVisible)}>
                                {isPasswordVisible? <VisibilityIcon /> : <VisibilityOffIcon /> }
                            </span>
                        </div>
                        <button onClick={()=>handleSignUp()}>Sign Up</button>
                        <button onClick={()=> {
                            setFirstName("John");
                            setLastName("Wick");
                            setEmail("jw@puppy.com");
                            setUsername("neo");
                            setPassword("keanu");
                            signupService("John","Wick","jw@puppy.com","neo","keanu",dispatchAuth);
                            }}>Sign up as Guest</button>
                        <p>Already a User? <NavLink to="/login">Login</NavLink></p>
                    </div>   
                    {/* CONFIRM PASSWORD */}

                    {/* <div className="password-wrapper">
                        <input type={isPasswordVisible? "text":"password"} onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}  placeholder="Confrim Password" required />
                        <span onClick={()=>setIsPasswordVisible(!isPasswordVisible)}>
                            {isPasswordVisible? <VisibilityIcon /> : <VisibilityOffIcon /> }
                        </span>
                    </div> */}
                     
                </div>
        
    </div>
        </>
    );
}