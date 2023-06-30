import { createContext, useContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { UserContext } from "./UserContext";

export const FollowingContext= createContext();

export function FollowingContextProvider({children}){

    const {stateAuth,dispatchAuth}= useContext(AuthContext);
    const {getAllUsers}= useContext(UserContext);

    const followHandler= (followUserID)=>{

        const setFollow =async ()=>{
            console.log("Following ID clicked::", followUserID);
            try{
                const res= await axios({
                    method:'POST',
                    url:`/api/users/follow/${followUserID}`,
                    headers:{ authorization: stateAuth.token,},
                });
    
                if(res.status===200){
                    console.log("User::",res.data.user);
                    console.log("FollowUser::",res.data.followUser);
                    console.log("UserDetails of loggedInUser::",stateAuth.userDetails[0]);
                    toast.success('Followed User');
                    dispatchAuth({
                        type:'FOLLOW_USER',
                        payload: {user: res.data.user},
                    });
                    
                }
            }
            catch(e){
                console.error(e);
            }
        }
        setFollow();
        getAllUsers();
    }

    // const setUnfollowers = (unfollowUserID)=>{
    //     console.log("To be unfollowed::", unfollowUserID);
        
        const setUnfollowers= async (unfollowUserID)=> {
            console.log("To be unfollowed::", unfollowUserID);
            console.log("Before unfollow -- UserDetails of loggedInUser::",stateAuth.userDetails[0]);
            try{
                const res = await axios.post(
                    `/api/users/unfollow/${unfollowUserID}`,
                    {},
                    {
                      headers: { authorization: stateAuth.token },
                    }
                  );

                if(res.status===200 || res.status===201){
                    console.log("After unfollow-- User::",res.data.user);
                    console.log("After unfollow-- FollowUser::",res.data.followUser);
                    console.log("After unfollow -- UserDetails of loggedInUser::",stateAuth.userDetails[0]);
                    toast.success('Unfollowed User!', {
                        position: "top-right",
                        autoClose: 700,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });

                    dispatchAuth({
                        type:'FOLLOW_USER',
                        payload: {user: res.data.user},
                    });


                }
            }
            catch(e){
                console.error(e);
            }
            finally{
                getAllUsers();
            }

        }

    // }
    // useEffect(()=>{
    //     getAllUsers();
    // },[]);
    return (
   <FollowingContext.Provider value={{followHandler,setUnfollowers}} >
        {children}
   </FollowingContext.Provider>
    );
}