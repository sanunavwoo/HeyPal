import { NavLink } from "react-router-dom";
import "./Footer.css";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';

import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export function Footer({setIsCreatePostFlag}){
    return (
        <>
            <div className="footer-div">
                
                    <NavLink to="/"><HomeOutlinedIcon /></NavLink>
                    <NavLink to="/explore"><ExploreOutlinedIcon /></NavLink>
                    <button className="create-post-btn" onClick={()=>setIsCreatePostFlag(true)}>+</button>
                    <NavLink to="/likedPosts"><FavoriteBorderOutlinedIcon /></NavLink>
                    <NavLink to="/bookmarks"><BookmarkBorderOutlinedIcon /></NavLink>
                    
                
            </div>
        </>
    );
}