import { useContext, useEffect } from "react";
import { LeftSideDiv } from "../../component/LeftSideDiv/LeftSideDiv";
import { Navigation } from "../../component/NavBar/Navigation";
import { RightSideDiv } from "../../component/RightSideDiv/RightSideDiv";
import { SinglePostCard } from "../../component/SinglePostCard/SinglePostCard";
import { AuthContext } from "../../contexts/AuthContext";
import { PostsContext } from "../../contexts/PostsContext";
import { UserContext } from "../../contexts/UserContext";
import BookmarkKitty from "../../Assets/BookmarkKitty.webp";
import "./Explore.css";

export function Bookmarks(){

    const {bookmarkedPostsID,allPosts,getAllPosts,getBookmarkHandler}= useContext(PostsContext);
    

    
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
                    
                        {bookmarkedPostsID.length>0 ?

                            <>
                       
                                {bookmarkedPostsID.map((eachPost)=>(
                                <div key={eachPost._id}>
                                    
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
                    
                </div>
            
        </>);
}