import "./LeftSideDiv.css";

import { NavLink } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';

import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export function LeftSideDiv(){

    const getActiveStyle=({isActive})=>(
        isActive? {
        color: "var(--white-color)",
        backgroundColor: "rgb(245, 186, 23)" ,
        boxShadow: "0 0px 3px rgb(107, 96, 96)"
    }
    :
    {
        color: "var(--black-color)",
        
    }
    );
    return(
        <>
            <div className="left-div">
                    <div className="left-div-navlink">
                        <span><HomeOutlinedIcon /></span><NavLink to="/" style={getActiveStyle}>Home</NavLink>
                    </div>
                    <div className="left-div-navlink">
                        <span><ExploreOutlinedIcon /></span><NavLink to="/explore" style={getActiveStyle}>Explore</NavLink>
                    </div>
                    <div className="left-div-navlink">
                        <span><BookmarkBorderOutlinedIcon /></span><NavLink to="/bookmarks" style={getActiveStyle}>Bookmarks</NavLink>
                    </div>
                    <div className="left-div-navlink">
                        <span><FavoriteBorderOutlinedIcon /></span><NavLink to="/likedPosts" style={getActiveStyle}>Liked Posts</NavLink>
                    </div>
                </div>
        </>
    );   
}
