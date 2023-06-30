import { useState } from "react";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { FollowingContext } from "../../../contexts/FollowingContext";
import { UserContext } from "../../../contexts/UserContext";

import "./SuggestedUsers.css";

export function SuggestedUsers(){
    
    const {allUsers,suggestedUsersLoading}= useContext(UserContext);
    const [suggestions,setSuggestions]= useState([]);
    const {stateAuth}= useContext(AuthContext);

    const {followHandler}= useContext(FollowingContext);
    // const suggestions= allUsers?.filter((user)=>user?.username!==stateAuth.userDetails[0].username);

    const navigate= useNavigate();

    // useEffect(()=>{
    //     setSuggestions(
    //         allUsers.filter((thisUser)=>
    //         !stateAuth.userDetails[0].following.find((curUser)=>
    //             curUser._id===thisUser._id) && stateAuth.userDetails[0].username !== thisUser.username)
            
    //         );
    // },[]);

    useEffect(()=>{
        setSuggestions(
                    allUsers.filter((thisUser)=>
                    !stateAuth.userDetails[0].following.find((curUser)=>
                        curUser._id===thisUser._id) && stateAuth.userDetails[0].username !== thisUser.username)
                    
                    )
    },[allUsers]);
    
    console.log("Suggested users:",suggestions);

    return(
        <>
            <h3>People you may know</h3>
            {suggestedUsersLoading? 
                <p>Loading...</p>
                :
                <div className="user-card-conatiner">
                {suggestions.map((suggestion)=>(
                    <div className="user-card">
                        <span className="avatar-img-span" onClick={()=>navigate(`/profile/${suggestion.username}`)}>
                            <img src={suggestion.avatarUrl} alt="avatarImg" />
                        </span>
                        <div className="user-card-details" onClick={()=>navigate(`/profile/${suggestion.username}`)}>
                            <p>{suggestion.firstName} {suggestion.lastName}</p>
                            <p>@{suggestion.username}</p>
                        </div>
                        <div className="user-card-followBtn-div">
                            <button onClick={()=>followHandler(suggestion._id)}>+Follow</button>
                        </div>
                    </div>
                ))}
                
                </div>
            }
          
        </>
    );
}