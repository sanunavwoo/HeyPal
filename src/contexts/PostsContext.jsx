import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "./AuthContext";

export const PostsContext= createContext();

export function PostContextProvider({children}){

    const [allPosts, setAllPosts]= useState([]);
    const [postsLoading, setPostsLoading]= useState(false);

    const [sortBy,setSortBy]= useState("Latest");

    const [singlePost,setSinglePost]= useState({});

    const [bookmarkedPostsID,setBookmarkedPostsID]= useState([]);
    const [bookmarkedPosts,setBookmarkedPosts]= useState([]);

    const [isCreatePostFlag,setIsCreatePostFlag]= useState(false);

    const [postFormData,setPostFormData]= useState({
       
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
        }
    );    

    const {stateAuth}= useContext(AuthContext);

    const getAllPosts= async ()=>{
        
        try{
            setPostsLoading(true);
            const res= await axios.get("/api/posts");
            if(res.status===200){
                
                console.log(res.data?.posts);
                setAllPosts(res.data?.posts);
                setPostsLoading(false);
            }

        }
        catch(e){
            console.error(e);
        }
    }

    // const getSinglePostById= async (postID)=>{
    //     try{
    //         setPostsLoading(true);
    //         const res= await axios.get(`/api/posts/${postID}`,
    //         {},
    //         {
    //             headers: { authorization: stateAuth.token,},
    //         }
    //         );

    //         if(res.status===200){
    //             console.log("Single post Object::",res.data?.post);
    //             setSinglePost(res.data?.post);
    //             setPostsLoading(false);
    //         }
    //     }
    //     catch(e){
    //         console.error(e);
    //     }
    // }

    const getSortedPosts= (allPosts, sortType)=>{
        switch(sortType.toUpperCase()){
            case "LATEST":
                return [...allPosts].sort((a,b)=>new Date(b.createdAt)- new Date(a.createdAt));
            
            case "TRENDING":
                return [...allPosts].sort((a,b)=>b.likes.likeCount - a.likes.likeCount);

            default:
                return [...allPosts];
        }
    }

    const createPostHandler= async (postFormDataToBeCreated)=>{
        console.log("Post to be created received::",postFormDataToBeCreated);
        try{
            const res = await axios.post('/api/posts', 

                { postData: postFormDataToBeCreated },
                {headers: 
                    {
                  authorization: stateAuth.token,
                    },
                },
                
              );
        
              if (res.status === 201) {
                
                // console.log("201 added post",res.data?.posts);
                toast.success('Post Created!', {
                    position: "top-right",
                    autoClose: 700,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                setAllPosts(res.data?.posts);
              }
        }
        catch(e){
            console.error(e);
        }
        finally{
            // getAllPosts();
        }
    }

    const editPostHandler= async (editedPostID, editedPost)=>{
        console.log("Edited address received::",editedPost);
        try{
            const res= await axios.post(`/api/posts/edit/${editedPostID}`,
                { postData: editedPost },
                { 
                headers: { authorization: stateAuth.token,},
                }
            );

            if(res.status===201){
                console.log("201 Changed Posts::",res.data?.posts);
                setAllPosts(res.data?.posts);
            }
        }
        catch(e){
            console.error(e);
        }
        finally{
            getAllPosts();
        }
    }

    const deletePostHandler= async (idOfPostToBeDeleted)=>{
        try{    
            const res= await axios(`/api/posts/${idOfPostToBeDeleted}`,
            {
                method:'DELETE',
                headers: {
                    authorization: stateAuth.token,
                },
            });

            if(res.status===201){
                // console.log("Post deleted-- ",idOfPostToBeDeleted);
                toast.success('Post Deleted!', {
                    position: "top-right",
                    autoClose: 700,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                removeBookmarkHandler(idOfPostToBeDeleted);
            }
        }
        catch(e){
            console.error(e);
        }
        finally{
            getAllPosts();
            
        }
    }

    const likeHandler= async (idOfPostLiked)=>{
        console.log("Post liked",idOfPostLiked);
        try{
            const res= await axios.post(`/api/posts/like/${idOfPostLiked}`,
            {},
            {
                headers: { authorization: stateAuth.token,},
            }
            
            );

            if(res.status===201){
                
                setAllPosts(res.data?.posts);
            }
        }
        catch(e){
            console.error(e);
        }

    }

    const dislikeHandler= async (idOfPostDisliked)=>{
        console.log("Post disliked",idOfPostDisliked);
        try{
            const res= await axios.post(`/api/posts/dislike/${idOfPostDisliked}`,
            {},
            {
                headers: { authorization: stateAuth.token,},
            }
            
            );

            if(res.status===201){
                
                setAllPosts(res.data?.posts);
            }
        }
        catch(e){
            console.error(e);
        }
    }

    const getBookmarkHandler= async ()=>{
        try{
            const res= await axios.get(`/api/users/bookmark`,
            {
                headers: { authorization: stateAuth.token,},
            }
            );

            if(res.status===200){
                console.log("Got bookmarked posts::",res.data?.bookmarks);
                setBookmarkedPostsID(res.data?.bookmarks);

            }
        }
        catch(e){
            console.error(e);
        }
        finally{
            setBookmarkedPosts(allPosts.filter(({_id})=>_id===Number(bookmarkedPostsID)));
        }
    }

    const addBookmarkHandler= async (idOfPostBookmarked)=>{
        try{
            const res= await axios.post(`/api/users/bookmark/${idOfPostBookmarked}`,
            {},
            {
                headers: { authorization: stateAuth.token,},
            }
            );

            if(res.status===200){
                console.log("Bookmarked::",res.data?.bookmarks);
                setBookmarkedPostsID(res.data?.bookmarks);
            }
        }
        catch(e){
            console.error(e);
        }
        finally{
            setBookmarkedPosts(allPosts.filter(({_id})=>_id===Number(bookmarkedPostsID)));
        }
    }

    const removeBookmarkHandler= async (idOfPostBookmarkedRemoved)=>{
        try{
            const res= await axios.post(`/api/users/remove-bookmark/${idOfPostBookmarkedRemoved}`,
            {},
            {
                headers: { authorization: stateAuth.token,},
            }
            );

            if(res.status===200){
                console.log("Changed Bookmarked::",res.data?.bookmarks);
                setBookmarkedPostsID(res.data?.bookmarks);
            }
        }
        catch(e){
            console.error(e);
        }
        finally{
            getBookmarkHandler();
            setBookmarkedPosts(allPosts.filter(({_id})=>_id===Number(bookmarkedPostsID)));
            
        }
    }

   

    useEffect(()=>{
        if(stateAuth.isAuth===true){
            getAllPosts();
        }
    },[stateAuth.isAuth])

    return(
    <PostsContext.Provider value={{allPosts,getAllPosts,setAllPosts,postsLoading,sortBy,setSortBy,singlePost,getSortedPosts,likeHandler,dislikeHandler,getBookmarkHandler,addBookmarkHandler,removeBookmarkHandler,bookmarkedPostsID,bookmarkedPosts,postFormData,setPostFormData,createPostHandler,editPostHandler,deletePostHandler,isCreatePostFlag,setIsCreatePostFlag}}>
        {children}
    </PostsContext.Provider>);
}