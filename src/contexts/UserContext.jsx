import { createContext, useState, useEffect,useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const UserContext= createContext();

export function UserContextProvider({children}){

    const [allUsers,setAllUsers]= useState([]);
    const [suggestedUsersLoading, setSuggestedUsersLoading]= useState(false); 
    
    const {stateAuth}= useContext(AuthContext);

    const getAllUsers= async ()=>{
        try{
            setSuggestedUsersLoading(true);
            const res= await axios.get('/api/users');
            if(res.status===200){
                console.log(res.data.users);
                setAllUsers(res.data?.users);
                setSuggestedUsersLoading(false);
            }
        }
        catch(e){
            console.error(e);
        }
    }

   const editProfile=async (editedProfile)=>{
        try{
            const res= await axios.post(`/api/users/edit`,
            
            { userData: editedProfile },
            { 
                headers: { authorization: stateAuth.token,},
            }

            );

            if(res.status===201){
                console.log("Updated Profile::",editedProfile);

            }

        }
        catch(e){
            console.error(e);
        }
        finally{
            getAllUsers();
        }
   }

    useEffect(()=>{
        if(stateAuth.isAuth===true){
            getAllUsers();
        }
        
    },[stateAuth.isAuth]);
    return(
        <UserContext.Provider value={{getAllUsers,allUsers,suggestedUsersLoading,editProfile}} >
            {children}
        </UserContext.Provider>
    );
}