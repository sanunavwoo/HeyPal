import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AddPost } from "../../component/AddPostBox/AddPost";
import { EditProfileForm } from "../../component/EditProfileForm/EditProfileForm";
import { Footer } from "../../component/Footer/Footer";
import { LeftSideDiv } from "../../component/LeftSideDiv/LeftSideDiv";
import { Navigation } from "../../component/NavBar/Navigation";
import { RightSideDiv } from "../../component/RightSideDiv/RightSideDiv";
import { SinglePostCard } from "../../component/SinglePostCard/SinglePostCard";
import { AuthContext } from "../../contexts/AuthContext";
import { FollowingContext } from "../../contexts/FollowingContext";
import { PostsContext } from "../../contexts/PostsContext";
import { UserContext } from "../../contexts/UserContext";
import "./Profile.css";

export function Profile(){

    const {username}= useParams();
   
    const {allUsers}= useContext(UserContext);
    const {allPosts,isCreatePostFlag,setIsCreatePostFlag}= useContext(PostsContext);
    const {stateAuth}= useContext(AuthContext);
    const {followHandler,setUnfollowers}= useContext(FollowingContext); 

    const [profileUserByUsername,setProfileUserByUsername]= useState({     
        following: [],
        followers: [],
    });
    const [userPosts, setUserPosts]= useState([]);

    const [isEditProfileFlag,setIsEditProfileFlag] =useState(false);
    const [profileDetailsToBeUpdated,setProfileDetailsToBeUpdated]= useState(0);

    const getUserByUsername= async ()=>{
        console.log("Profile requested for User:: ",username);
       try{
           const res= await axios.get(`/api/users/${username}`);
           if(res.status===200){
               console.log("Inside 200 get user by UserID::", res.data?.user);
               setProfileUserByUsername(res.data?.user);
               
           }
       }
       catch(e){
           console.error(e);
       }
   }
   console.log("profileUserByUsername::",profileUserByUsername.followers,profileUserByUsername.following);
    const getPostByUsername= async ()=>{
        try{
            const res= await axios.get(`/api/posts/user/${username}`);
            if(res.status===200){
                console.log("Inside 200 get post by username::", res.data?.posts);
                setUserPosts(res.data?.posts);
            }
        }
        catch(e){
            console.error(e);
        }
    }

    const isFollowingThisUser= (user)=>stateAuth.userDetails[0].following.findIndex((item)=>item.username===user);
    // const isFollowingThisUser= (userID)=>{
    //     const localStorageLoginDetails= JSON.parse(localStorage?.getItem("loginDetails"));
    //     console.log("localStorageLoginDetails::",localStorageLoginDetails?.user);
    //     return allUsers.find(({_id})=>_id===localStorageLoginDetails?.user._id)?.following?.find(({_id})=>_id===userID) ? true : false;
    // }
    const isFollowingThisUserFlag= isFollowingThisUser(profileUserByUsername.username);

    function handleFollowButtonClick(){
  
        console.log("Inside follow button click isFollowingThisUserFlag::", isFollowingThisUserFlag);
        if(isFollowingThisUserFlag===-1){
            //Follow Handler
            followHandler(profileUserByUsername._id);

        }
        else{
            //UnfollowHandler
            console.log("Here");
            setUnfollowers(profileUserByUsername._id);
            
        }
    }

    useEffect(()=>{
        getUserByUsername();
        getPostByUsername();
    },[username,allPosts, allUsers,stateAuth]);


    return(
        <>
            <Navigation />
                <div className="homepage-container">
                    
                    
                    <LeftSideDiv />
                    <div className="center-div">
                            <>

                            <div className= "profile-container">
                                <div className="profile-header">
                                    <img src={profileUserByUsername?.avatarUrl} alt="avatar" />
                                    <div className="profile-header-left-userDetails">
                                        { profileUserByUsername && <h2>{profileUserByUsername?.firstName} {profileUserByUsername?.lastName}</h2>}
                                        { profileUserByUsername && <small>@{profileUserByUsername?.username}</small>}
                                    </div>
                                    <div className="profile-header-right">
                                        {profileUserByUsername.username=== stateAuth.userDetails[0].username?
                                            (<button onClick={()=>{
                                                setIsEditProfileFlag(true);
                                                setProfileDetailsToBeUpdated(profileUserByUsername);
                                                }}>Edit</button>)
                                            :
                                            (<button onClick={()=>handleFollowButtonClick()}>{isFollowingThisUserFlag===-1? "Follow" : "Unfollow"}</button>)
                                        }
                                        {isEditProfileFlag && <EditProfileForm setIsEditProfileFlag={setIsEditProfileFlag} profileDetailsToBeUpdated={profileDetailsToBeUpdated} />}
                                    </div> 

                                </div>

                                <div className="profile-content-div">
                                        {profileUserByUsername && <p>{profileUserByUsername?.bio}</p>}
                                        <div className="website-createdDate">
                                            <Link to={profileUserByUsername?.website}>{profileUserByUsername?.website}</Link>
                                            {profileUserByUsername && <small>Joined on {new Date(profileUserByUsername?.createdAt).toDateString().split(" ").splice(1,4).join()}</small>}
                                        </div>
                                </div>

                                <div className="stats-div">
                                        <span>{userPosts.length} Posts</span>
                                        {profileUserByUsername && 
                                            <>
                                            <span>{profileUserByUsername?.followers.length && profileUserByUsername?.followers.length} Followers</span>
                                            <span>{profileUserByUsername?.following.length && profileUserByUsername?.following.length} Following</span>
                                            </>
                                        }
                                        
                                    
                                </div>
                               
                            </div>
                            <div>
                                {isCreatePostFlag && <AddPost setIsCreatePostFlag={setIsCreatePostFlag} /> }
                            </div>
                            <div className="post-conatiner">
                                {userPosts && userPosts.length>0 && userPosts?.map((eachPost)=>(
                                    <div key={eachPost._id}>
                                        <SinglePostCard eachPost={eachPost} />
                                    </div>
                                ))}
                            </div>
                      
                        </>
  
                    </div>
                    <RightSideDiv />
                    
                </div>
                <Footer setIsCreatePostFlag={setIsCreatePostFlag} />
        </>
    );
}