import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../../contexts/PostsContext";

import "./EditPostBox.css";

export function EditPostBox({setIsEditPostFlag,postToBeUpdated,setShowContextualMenu}){

    console.log("postToBeEdited::",postToBeUpdated);

    const {editPostHandler}= useContext(PostsContext);

    const [editPostFormData,setEditPostFormData]= useState({
            content:"",
            mediaURL:"",
            // likes: {
            //   likeCount: 0,
            //   likedBy: [],
            //   dislikedBy: [],
            // },
            comments: [],
            // username: "",
            // createdAt: "",
            // updatedAt: "",
    });

    function editPostFormHandler(e){
        
        console.log("Inside handleEditPost");
        e.preventDefault();
        editPostHandler(postToBeUpdated._id,editPostFormData);
        setIsEditPostFlag(false);
    }

    function handleImageChange(e){
        const file= e.target.files[0];
        const fileURL= URL.createObjectURL(file);
        console.log("File URL::",fileURL);

        setEditPostFormData((editPostFormData)=>({
            ...editPostFormData,
            [e.target.name]: fileURL,
        }));
    }

    useEffect(()=>{
        if(postToBeUpdated!==0){
            setEditPostFormData(()=>({...postToBeUpdated}));
        }
    },[]);

    return(
        <>
            <div className="addComment-container">
                <div className="addComment">
                            
                         <form onSubmit={editPostFormHandler}>
                            
                        
                            <div className="post-content">
                                <textarea
                                    placeholder="Edit Post.."
                                    height="2rem"
                                    width="100%"
                                    outline="none"
                                    border="none"
                                    resize="none"
                                    focusBorderColor="transparent"
                                    name="content"
                                    value= {editPostFormData.content}
                                    required
                                    onChange={(e)=>setEditPostFormData((editPostFormData)=>({
                                        ...editPostFormData,
                                        [e.target.name]: e.target.value,
                                    }))}
                                />

                                {/* <input
                                    type="text"
                                    placeholder="Enter Media URL"
                                    name="mediaURL"
                                    value= {editPostFormData.mediaURL}
                                    
                                    onChange={(e)=>setEditPostFormData((editPostFormData)=>({
                                        ...editPostFormData,
                                        [e.target.name]: e.target.value,
                                    }))}
                                /> */}
                                {editPostFormData.mediaURL.length>0 && <img id="post-img" src={editPostFormData.mediaURL} /> }

                                <input 
                                type="file"
                                id="imageInput"
                                name="mediaURL"
                                
                                onChange={handleImageChange}
                             /> 

                            </div>

                            <span className="edit-post-btns">
                                <button className="edit-post-btn" type="submit">Submit</button>
                                <button className="edit-post-btn" onClick={()=>{
                                    setIsEditPostFlag(false);
                                    setShowContextualMenu(false);
                                    }}>Cancel</button>
                            </span>

                             
                        </form>
                </div>   
            </div>
        </>
    );
}