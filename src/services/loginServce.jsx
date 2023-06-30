import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export const loginService= async (username,loginPassword, dispatchAuth)=>{
    console.log("Username and pwd::",username," ",loginPassword);
    try{
        const res= await axios.post('/api/auth/login',{
                username: username,
                password: loginPassword

        });

        if(res.status===200){
            console.log(res.data.foundUser);
            localStorage.setItem("loginDetails",JSON.stringify({user: res.data.foundUser, token: res.data.encodedToken}));

            dispatchAuth({
                type:"GET_USER_DETAILS",
                payload: {
                    user: res.data.foundUser,
                    token: res.data.encodedToken
                }
            });
            toast.success('Logged In Successfully');
        }
    }   
    catch(e){
        console.error(e);
        toast.error('Something went wrong');
    }
}