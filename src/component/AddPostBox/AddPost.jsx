import { useContext, useEffect } from "react";
import { PostsContext } from "../../contexts/PostsContext";
import "./AddCommentBox.css";


export function AddPost({setIsCreatePostFlag}){

    const {postFormData,setPostFormData,createPostHandler}= useContext(PostsContext);


    function addPostFormHandler(e){
        e.preventDefault();
        console.log("From addPostFormHandler func--", postFormData);
        createPostHandler(postFormData);

        setIsCreatePostFlag(false);
    }

    function handleImageChange(e){
        const file= e.target.files[0];
        const fileURL= URL.createObjectURL(file);
        console.log("File URL::",fileURL);

        setPostFormData((postFormData)=>({
            ...postFormData,
            [e.target.name]: fileURL,
        }));
    }
    useEffect(()=>{
        setPostFormData({
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
    },[]);

    return(
        <>
            <div className="addComment-container">
                <div className="addComment">

                <h3>Speak you mind</h3>
                            
                         <form onSubmit={addPostFormHandler}>
                            
                        

                            <textarea
                                placeholder="Add Post.."
                                height="8rem"
                                width="100%"
                                outline="none"
                                border="none"
                                resize="none"
                                focusBorderColor="transparent"
                                name="content"
                                value= {postFormData.text}
                                required
                                onChange={(e)=>setPostFormData((postFormData)=>({
                                    ...postFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                            />

                            {/* <input
                                type="text"
                                placeholder="Enter Media URL"
                                name="mediaURL"
                                value= {postFormData.mediaURL}
                                
                                onChange={(e)=>setPostFormData((postFormData)=>({
                                    ...postFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             /> */}
                             
                             <input 
                                type="file"
                                id="imageInput"
                                name="mediaURL"
                               
                                onChange={handleImageChange}
                             />

                             <button type="submit">Submit</button>
                             <button onClick={()=>setIsCreatePostFlag(false)}>Cancel</button>
                        </form>
                </div>   
            </div>
        </>
    );
}