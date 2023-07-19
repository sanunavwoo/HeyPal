import { useContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { LeftSideDiv } from "../../component/LeftSideDiv/LeftSideDiv";
import { Navigation } from "../../component/NavBar/Navigation";
import { RightSideDiv } from "../../component/RightSideDiv/RightSideDiv";
import { SinglePostCard } from "../../component/SinglePostCard/SinglePostCard";
import { AuthContext } from "../../contexts/AuthContext";
import { PostsContext } from "../../contexts/PostsContext";
import { UserContext } from "../../contexts/UserContext";
import BookmarkKitty from "../../Assets/BookmarkKitty.webp";
import "./Explore.css";
import { Footer } from "../../component/Footer/Footer";
import { AddPost } from "../../component/AddPostBox/AddPost";

export function Bookmarks(){

    const {bookmarkedPostsID,allPosts,getAllPosts,getBookmarkHandler,isCreatePostFlag,setIsCreatePostFlag}= useContext(PostsContext);
    

    
    // console.log("Bookmarked posts::", bookmarkedPosts);
    const getBookmarkedPosts= (postID)=>allPosts.filter((post)=>post._id===postID)[0];
    
    useEffect(()=>{
        getBookmarkHandler();
    },[]);
    
    return(
        <>
            <Navigation />
                <div className="homepage-container">
                    
                    
                    <LeftSideDiv />
                    <div className="center-div">
                    
                    <div>
                        {isCreatePostFlag && <AddPost setIsCreatePostFlag={setIsCreatePostFlag} /> }
                    </div>

                        {bookmarkedPostsID.length>0 ?

                            <>
                       
                                {bookmarkedPostsID.map((eachPost)=>(
                                <div key={eachPost._id} className="post-card-container-div">
                                    
                                    <SinglePostCard eachPost={getBookmarkedPosts(eachPost)} />
                                </div>
                                ))}
                             </>
                             :
                            <div>
                                <h1>Start bookmarking posts to view here</h1>
                                <img className="kitty" src={BookmarkKitty} />
                            </div>
                          

                            
                        }
                       
                        
                        
                    </div>
                    <RightSideDiv />
                    <ToastContainer autoClose={700} />  
                </div>
                <Footer setIsCreatePostFlag={setIsCreatePostFlag} />
        </>);
}