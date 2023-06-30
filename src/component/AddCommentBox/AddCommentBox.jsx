import { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../../contexts/AuthContext";

import "./AddCommentBox.css";

export function AddCommentBox({setIsCommentForm,commentsForThisPost,setCommentsForThisPost}){

    const {stateAuth}= useContext(AuthContext);
    const [commentBoxData, setCommentBoxData]= useState({
        
            _id: uuid(),
            username: stateAuth.userDetails[0].username,
            text: "",
            votes: {
              upvotedBy: [],
              downvotedBy: [],
            },
          
    });

    function handleAddComment(e){
        e.preventDefault();
        console.log("From handleAddComment func--", commentBoxData);
        
        setCommentsForThisPost((commentsForThisPost)=>[...commentsForThisPost, commentBoxData]);

        setIsCommentForm(false);
    }

    useEffect(()=>{
        setCommentBoxData((commentBoxData)=>({...commentBoxData, text: ""}));
    },[]);

    return(
        <>
            <div className="addComment-container">
                <div className="addComment">
                            
                         <form onSubmit={handleAddComment}>
                            
                        

                            <textarea
                                placeholder="Comment your thoughts.."
                                height="8rem"
                                width="100%"
                                outline="none"
                                border="none"
                                resize="none"
                                focusBorderColor="transparent"
                                name="text"
                                value= {commentBoxData.text}
                                required
                                onChange={(e)=>setCommentBoxData((commentBoxData)=>({
                                    ...commentBoxData,
                                    [e.target.name]: e.target.value,
                                }))}
                            />
                             <button type="submit">Submit</button>
                             <button onClick={()=>setIsCommentForm(false)}>Cancel</button>
                        </form>
                </div>   
            </div>
        </>
    );

}