import { useContext, useEffect,useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { Fab } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TuneIcon from '@mui/icons-material/Tune';

import { AddPost } from "../../component/AddPostBox/AddPost";
import { LeftSideDiv } from "../../component/LeftSideDiv/LeftSideDiv";
import { Navigation } from "../../component/NavBar/Navigation";
import { RightSideDiv } from "../../component/RightSideDiv/RightSideDiv";
import { SinglePostCard } from "../../component/SinglePostCard/SinglePostCard";
import { AuthContext } from "../../contexts/AuthContext";
import { FollowingContext } from "../../contexts/FollowingContext";
import { PostsContext } from "../../contexts/PostsContext";
import { UserContext } from "../../contexts/UserContext";
import "./Home.css"
import { SuggestedUsers } from "./HomeComponents/SuggestedUsers";
import { Footer } from "../../component/Footer/Footer";
import { Loader } from "../../component/Loader/Loader";


export function Home(){

    const {allUsers,getAllUsers}= useContext(UserContext);
    const {allPosts,postsLoading,getSortedPosts,sortBy,setSortBy,isCreatePostFlag,setIsCreatePostFlag}= useContext(PostsContext);
    const {stateAuth}= useContext(AuthContext);
    const {followHandler}= useContext(FollowingContext);

    const navigate= useNavigate();
    const myPosts= [...allPosts].filter((item)=>item.username===stateAuth.userDetails[0].username);

    const postsOfPeopleFollowed= [...allPosts].filter((posts)=>stateAuth.userDetails[0].following.find((user)=>user.username===posts.username));

    const postData= [...myPosts, ...postsOfPeopleFollowed];

    // const [isCreatePostFlag,setIsCreatePostFlag]= useState(false);

    const [searchedTerm,setSearchedTerm]= useState("");

    const [showFilterMenu,setShowFilterMenu]= useState(false);


    
    function handleSearch(e){
        console.log(e.target.value);
        setSearchedTerm(e.target.value);

    }

    const searchedUsers= allUsers.filter((user)=>user.firstName.toLowerCase().includes(searchedTerm.toLowerCase()) || user.lastName.toLowerCase().includes(searchedTerm.toLowerCase()) || user.username.toLowerCase().includes(searchedTerm.toLowerCase()));


    console.log("Post Data::",postData);

    const sortedProducts= getSortedPosts(postData, sortBy);

    // useEffect(()=>{
    //     getAllUsers();
    //     getSuggestedUsersData();
    // },[]);
    return(
        <div>
            <Navigation />
            <div className="homepage-conatiner">
                
                
                <LeftSideDiv />
                <div className="center-div">

            
                <div className="searchbar-div">
                    <input onChange={(e)=>handleSearch(e)} type="text" placeholder="Search Users..." />
                </div>
            
                {searchedTerm.length>0 && searchedUsers.length>0 && 
                <div className="search-parent">
                    <div className="search-results-container">
                        
                        {searchedUsers.map((searchedUser)=>(
                            <div className="searcheduser-card">
                            <span className="avatar-img-span" onClick={()=>navigate(`/profile/${searchedUser.username}`)}>
                                <img src={searchedUser.avatarUrl} alt="avatarImg" />
                            </span>
                            <div className="searcheduser-card-details" onClick={()=>navigate(`/profile/${searchedUser.username}`)}>
                                <p>{searchedUser.firstName} {searchedUser.lastName}</p>
                                <p>@{searchedUser.username}</p>
                            </div>
                        </div>
                        ))}
                        

                    </div>
                </div>
                }

                {/* <div className="filter-btn-container">
                    <button onClick={()=>setSortBy("Trending")}>Trending</button>
                    <button onClick={()=>setSortBy("Latest")}>Latest</button>
                </div> */}
                <div className="filter-header">
                    <h3>{sortBy} Posts</h3>
                    <div className="filter-header-right">
                    <button onClick={()=>setShowFilterMenu(!showFilterMenu)}><TuneIcon /></button>
                    {showFilterMenu && 
                            <span className="filter-menu">
                                <span>
                                    <button onClick={()=>setSortBy("Trending")}>Trending</button>
                                    <button onClick={()=>setSortBy("Latest")}>Latest</button>
                                    <button onClick={()=>setSortBy("Oldest")}>Oldest</button>
                                </span>
                            </span>
                        }
                    </div>
                </div>

                <div>
                <button className="create-post-btn" onClick={()=>setIsCreatePostFlag(true)}>+</button>
                    {/* <Fab color="primary" onClick={()=>setIsCreatePostFlag(true)} aria-label="add">
                        <AddIcon />
                    </Fab> */}
                    {isCreatePostFlag && <AddPost setIsCreatePostFlag={setIsCreatePostFlag} /> }
                </div>

               
                {postsLoading?
                       
                        
                        <Loader />
                       
                    :
                    <>
                        {sortedProducts.length>0 ? 
                            sortedProducts.map((eachPost)=>(
                                <div key={eachPost._id} className="post-card-container-div">
                                
                                    <SinglePostCard eachPost={eachPost} />
                                </div>
                                ))
                                :
                                <div>
                                    <p>Follow people to see posts</p>
                                </div>
                   }
                    </>
                    }
                </div>
                <RightSideDiv />
                
                <ToastContainer autoClose={700} />
            </div>
            <Footer setIsCreatePostFlag={setIsCreatePostFlag} />
        </div>
    );
}