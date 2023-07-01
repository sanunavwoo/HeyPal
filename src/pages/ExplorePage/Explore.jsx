import { useContext,useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddPost } from "../../component/AddPostBox/AddPost";
import { Footer } from "../../component/Footer/Footer";

import { LeftSideDiv } from "../../component/LeftSideDiv/LeftSideDiv";
import { Loader } from "../../component/Loader/Loader";
import { Navigation } from "../../component/NavBar/Navigation";
import { RightSideDiv } from "../../component/RightSideDiv/RightSideDiv";
import { SinglePostCard } from "../../component/SinglePostCard/SinglePostCard";
import { PostsContext } from "../../contexts/PostsContext";

import "./Explore.css";

export function Explore(){

    const {allPosts,postsLoading,getSortedPosts,sortBy,setSortBy,isCreatePostFlag,setIsCreatePostFlag}= useContext(PostsContext);
    // const [sortBy,setSortBy]= useState("Latest");
    console.log("AllPosts::",allPosts);

    const sortedProducts= getSortedPosts(allPosts, sortBy);
    return(
        <div>
            <Navigation />
            <div className="homepage-container">
                
                
                <LeftSideDiv />
                <div className="center-div">
                
                    <div className="filter-btn-container">
                        <button onClick={()=>setSortBy("Trending")}>Trending</button>
                        <button onClick={()=>setSortBy("Latest")}>Latest</button>
                    </div>

                    <div>
                        {isCreatePostFlag && <AddPost setIsCreatePostFlag={setIsCreatePostFlag} /> }
                    </div>
                    <h3>{sortBy} Posts</h3>
                    {postsLoading?
                        <img className="loading-img" src="https://assets.materialup.com/uploads/a7e6009b-6d69-4569-b1ee-0e01b234f2a1/preview.gif" />
                    :
                    <>
                        {sortedProducts.map((eachPost)=>(
                        <div key={eachPost._id}>
                           
                            <SinglePostCard eachPost={eachPost} />
                        </div>
                    ))}
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