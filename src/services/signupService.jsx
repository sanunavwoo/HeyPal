import axios from "axios";


export const signupService= async (firstName,lastName,email,username,password,dispatchAuth)=>{
    
    try{
        const res= await axios({
            method:'POST',
            url:'/api/auth/signup',
            data:{
                firstName:firstName,
                lastName:lastName,
                email:email,
                username:username,
                password:password,
            }
        });

        if(res.status===201){
            console.log(res.data.createdUser);
            localStorage.setItem("loginDetails",JSON.stringify({user: res.data.createdUser, token: res.data.encodedToken}));
            dispatchAuth({
                type:"CREATE_USER",
                payload:{
                    user: res.data.createdUser,
                    token: res.data.encodedToken
                }
            });
           

        }
    }
    catch(e){
        console.error(e);
    }
}