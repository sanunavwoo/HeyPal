import { NavLink } from "react-router-dom";
import "./Footer.css";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';

import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export function Footer({setIsCreatePostFlag}){

    const getActiveStyle=({isActive})=>(
        isActive? {
        color: "rgb(245, 186, 23)",
        // backgroundColor: "rgb(245, 186, 23)" ,
        // boxShadow: "0 0px 3px rgb(107, 96, 96)"
    }
    :
    {
        
        
    }
    );

    return (
        <>
            <div className="footer-div">
                
                    <NavLink to="/" style={getActiveStyle}><HomeOutlinedIcon /></NavLink>
                    <NavLink to="/explore" style={getActiveStyle}><ExploreOutlinedIcon /></NavLink>
                    <button className="create-post-btn" onClick={()=>setIsCreatePostFlag(true)}>+</button>
                    <NavLink to="/likedPosts" style={getActiveStyle}><FavoriteBorderOutlinedIcon /></NavLink>
                    <NavLink to="/bookmarks" style={getActiveStyle}><BookmarkBorderOutlinedIcon /></NavLink>
                    
                
            </div>
        </>
    );
}