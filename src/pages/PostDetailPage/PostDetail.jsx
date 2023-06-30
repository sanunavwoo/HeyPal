import { useContext} from "react";

import { useParams } from "react-router-dom";
import { LeftSideDiv } from "../../component/LeftSideDiv/LeftSideDiv";
import { Navigation } from "../../component/NavBar/Navigation";
import { RightSideDiv } from "../../component/RightSideDiv/RightSideDiv";
import { SinglePostCard } from "../../component/SinglePostCard/SinglePostCard";
import { PostsContext } from "../../contexts/PostsContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function PostDetail(){

    const {postID}= useParams();
  
    const {allPosts}= useContext(PostsContext);

    const selectedPost= allPosts.find(({_id})=>_id===postID);

    const showComments=true;

    return(
        <>
            <Navigation />
                <div className="homepage-container">
                    
                    
                    <LeftSideDiv />
                    <div className="center-div">
                            <>

                            <div>
                               
                                <SinglePostCard eachPost={selectedPost} showComments={showComments} />
                            </div>
                      
                        </>
  
                    </div>
                    <RightSideDiv />
                    <ToastContainer autoClose={700} />
                </div>
            
        </>);
}