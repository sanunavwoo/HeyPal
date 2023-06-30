import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';


import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


import { AuthContext } from "../../contexts/AuthContext";
import { PostsContext } from "../../contexts/PostsContext";
import {UserContext} from "../../contexts/UserContext";
import { AddCommentBox } from "../AddCommentBox/AddCommentBox";
import { EditPostBox } from "../EditPostBox/EditPostBox";

import "./SinglePostCard.css"
export function SinglePostCard({eachPost,showComments}){

    const {allUsers}= useContext(UserContext);
    const {stateAuth}= useContext(AuthContext);
    const {likeHandler,dislikeHandler,addBookmarkHandler,removeBookmarkHandler,bookmarkedPostsID,deletePostHandler,getBookmarkHandler}= useContext(PostsContext);

    const [userData, setUserData]= useState({});

    const [commentsForThisPost, setCommentsForThisPost]= useState([]);
    const [isCommentForm, setIsCommentForm]= useState(false);

    const [showContextualMenu,setShowContextualMenu]= useState(false);

    const [isEditPostFlag,setIsEditPostFlag]= useState(false);
    const [postToBeUpdated, setPostToBeUpdated]= useState(0);

    const navigate= useNavigate();


    useEffect(()=>{
        setUserData(allUsers?.find(({username})=>username===eachPost.username));
        setCommentsForThisPost(eachPost.comments);
    },[bookmarkedPostsID]);

    
    const isLikedByFlag= eachPost?.likes?.likedBy?.findIndex(({_id})=>_id===stateAuth.userDetails[0]._id);

    const isPostBookmarkedFlag= bookmarkedPostsID.findIndex((id)=>id===eachPost._id);

    const onShareHandler= (idToBeShared)=>{
        navigator.clipboard.writeText(`https://heyPal.netlify.app/post/${idToBeShared}`);
        alert("Link copied");
    }

    const goToPostDetailsHandler= (id)=>{
        navigate(`/post/${id}`);
    }

    const handleDeletePost=(id)=>{
        deletePostHandler(id);
        getBookmarkHandler();
    }

    return(
        <>
            <div className="singlePostCard-container">
                <div className="singlePostCard-header">
                    <img src={userData.avatarUrl} alt="avatar" />
                    <div className="singlePostCard-header-left-userDetails" onClick={()=>navigate(`/profile/${userData.username}`)}>
                        <h2>{userData.firstName} {userData.lastName}</h2> 
                        <small>@{userData.username}</small>
                    </div>
                    <div className="singlePostCard-header-right">
                        {userData.username===stateAuth.userDetails[0].username && 
                            <button onClick={()=>setShowContextualMenu(!showContextualMenu)}><MoreHorizIcon /></button>
                            
                        }
                        {showContextualMenu && 
                            <span className="contextual-menu">
                                <button onClick={()=>{
                                        setIsEditPostFlag(true);
                                        setPostToBeUpdated(eachPost);
                                        }
                                    }>Edit</button>
                                <button onClick={()=>{
                                    handleDeletePost(eachPost._id);
                                    setShowContextualMenu(false);
                                    }}>Delete</button>
                            </span>
                        }
                        {isEditPostFlag && <EditPostBox setIsEditPostFlag={setIsEditPostFlag} postToBeUpdated={postToBeUpdated} setShowContextualMenu={setShowContextualMenu} /> }
                    </div>
                </div>
                <div className="singlePostCard-content-div" onClick={()=>goToPostDetailsHandler(eachPost._id)}>
                        <p>{eachPost.content}</p>

                        {
                            eachPost.mediaURL.length>0 && eachPost.mediaURL.split("/")[4]==="image"? 
                                (<img src={eachPost.mediaURL} alt="post-img" style={{height: "30%", width: "100%", objectFit:"cover" }} />)
                                :

                                eachPost.mediaURL && eachPost.mediaURL.split("/")[4]==="video"?
                                (<video style={{height: "30%", width: "100%", objectFit:"contain"}}>
                                    <source src={eachPost.mediaURL} />
                                </video>)
                                
                                :

                                (eachPost.mediaURL && <img src={eachPost.mediaURL} alt="post-img" style={{height: "30%", width: "100%", objectFit:"cover" }} />)
                        }
                        <small>{new Date(eachPost.createdAt).toDateString().split(" ").splice(1,4).join()}</small>
                </div>
           
                <div className="action-btns">
                    <span><button onClick={()=>isLikedByFlag===-1? likeHandler(eachPost._id) : dislikeHandler(eachPost._id) }>{isLikedByFlag===-1? <FavoriteBorderOutlinedIcon /> : <FavoriteIcon /> }</button><span className="qty">{eachPost.likes.likeCount}</span></span>
                    <span><button onClick={()=>setIsCommentForm(true)}><CommentIcon /></button><span className="qty">{commentsForThisPost?.length}</span></span>
                    <span><button onClick={()=>isPostBookmarkedFlag===-1?addBookmarkHandler(eachPost._id) : removeBookmarkHandler(eachPost._id) }>{isPostBookmarkedFlag===-1 ? <BookmarkBorderOutlinedIcon /> : <BookmarkIcon />}</button></span>

                    {/* <span><button onClick={()=>{
                        if(isPostBookmarkedFlag===-1){
                            addBookmarkHandler(eachPost._id)
                        }
                        else{
                            removeBookmarkHandler(eachPost._id);
                            setUserData(allUsers?.find(({username})=>username===eachPost.username));
                        }
                    }}>{isPostBookmarkedFlag===-1 ? "Bookmark":"Remove Bookmark"}</button></span> */}
                    
                    <span><button onClick={()=>onShareHandler(eachPost._id)}><ShareIcon /></button></span>
                </div>
                {isCommentForm && <AddCommentBox commentsForThisPost={commentsForThisPost} setCommentsForThisPost={setCommentsForThisPost} setIsCommentForm= {setIsCommentForm} /> }

                {showComments && eachPost?.comments?.length>0 && 
                    (<div className="all-comments-container">
                        {commentsForThisPost?.map((com)=>
                            (   
                                <div className="singleComment-container">
                                    <div className="singlePostCard-header" onClick={()=>navigate(`/profile/${com.username}`)}>
                                        
                                        <img src={allUsers.find(({username})=>username===com.username).avatarUrl} alt="avatar" />
                                        
                                        <div className="singlePostCard-header-left-userDetails">
                                            <h2>{allUsers.find((thisUser)=>thisUser.username===com.username).firstName}</h2>
                                            <small>@{com.username}</small>
                                        </div>
                                        
                                    </div>
                                    <div className="singleComment-content-div">
                                            <p>{com.text}</p>
                                    </div>    
                                </div>
                            )
                        )}
                    </div>)
                }
                
            </div>
        </>
    );
}