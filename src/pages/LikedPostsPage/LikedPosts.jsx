import { useContext } from "react";
import { LeftSideDiv } from "../../component/LeftSideDiv/LeftSideDiv";
import { Navigation } from "../../component/NavBar/Navigation";
import { RightSideDiv } from "../../component/RightSideDiv/RightSideDiv";
import { SinglePostCard } from "../../component/SinglePostCard/SinglePostCard";
import { AuthContext } from "../../contexts/AuthContext";
import { PostsContext } from "../../contexts/PostsContext";
import BookmarkKitty from "../../Assets/BookmarkKitty.webp";


import "./Explore.css";

export function LikedPosts(){
    console.log("In likedpOts page")

    const {stateAuth}= useContext(AuthContext);
    const {allPosts}= useContext(PostsContext);

    const likedPostsArr= [...allPosts].filter((i)=>i.likes.likedBy.find(({_id})=>_id===stateAuth.userDetails[0]._id));
    console.log("Liked Posts::",likedPostsArr);

    return(
    <>
        <Navigation />
            <div className="homepage-container">
                
                
                <LeftSideDiv />
                <div className="center-div">
                
                {likedPostsArr.length>0 ?
                    <>
                        
                        {likedPostsArr.map((eachPost)=>(
                        <div key={eachPost._id}>
                           
                            <SinglePostCard eachPost={eachPost} />
                        </div>
                    ))}
                    </>

                    :
                    <div>
                        <h1>Start liking posts to view here</h1>
                        <img className="kitty" src={BookmarkKitty} />
                    </div>            
                        
                } 
                    
                    
                    
                </div>
                <RightSideDiv />
                
            </div>
        
    </>);
}