import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import logo from "../../Assets/logo.png";


import "./navbar.css";
import { UserContext } from "../../contexts/UserContext";

import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';



export function Navigation(props){

    
    const {stateAuth,dispatchAuth}= useContext(AuthContext);
    const {allUsers}= useContext(UserContext);

    const navigate=useNavigate();
    // const [searchedTerm,setSearchedTerm]= useState("");

   
    
    // function handleSearch(e){
    //     console.log(e.target.value);
    //     setSearchedTerm(e.target.value);

    // }

    // const searchedUsers= allUsers.filter((user)=>user.firstName.toLowerCase().includes(searchedTerm.toLowerCase()) || user.lastName.toLowerCase().includes(searchedTerm.toLowerCase()) || user.username.toLowerCase().includes(searchedTerm.toLowerCase()));

    // console.log("searchedUsers:: ",searchedUsers);

    function logoutHandler(){
        

        dispatchAuth({
            type: 'USER_LOGOUT',
            payload: {
                user: [],
                token: null,
                isAuth: false 
            }
        });
    
    
        localStorage.removeItem("loginDetails");
       
    
        if(stateAuth.isAuth===false){
            navigate("/");
        }
        console.log("STATE AFTER LOGUT::", stateAuth.userDetails);
    }

    function getActiveStyle({isActive}){
        return isActive? {color:"var(--black-color)"} : {color:"var(--white-color)"}
    }
    
    return(
        <nav className="navbar">
            <div className="logo-div">

                <NavLink to="/" activeClassName="selected" style={getActiveStyle} >
                <div>
                    <img src={logo} style={{height: "50px", width: "120px" }} />
                </div>
                </NavLink>
            </div>
            {/* <div className="searchbar-div">
                <input onChange={(e)=>handleSearch(e)} type="text" placeholder="Search Users..." />
            </div>
            
            {searchedTerm.length>0 && searchedUsers.length>0 && 
            
                <div className="search-results-container">
                    
                    {searchedUsers.map((searchedUser)=>(
                        <div className="user-card">
                        <span className="avatar-img-span" onClick={()=>navigate(`/profile/${searchedUser.username}`)}>
                            <img src={searchedUser.avatarUrl} alt="avatarImg" />
                        </span>
                        <div className="user-card-details" onClick={()=>navigate(`/profile/${searchedUser.username}`)}>
                            <p>{searchedUser.firstName} {searchedUser.lastName}</p>
                            <p>@{searchedUser.username}</p>
                        </div>
                    </div>
                    ))}
                    

                </div>
            } */}
            <ul className="navbar-list">
                
                { stateAuth.isAuth && <li className="navbar-list-item">
                    <NavLink to={`/profile/${stateAuth.userDetails[0].username}`}  style={getActiveStyle}><PersonOutlineIcon /></NavLink>
                </li>}
                {stateAuth.isAuth===true && <li className="navbar-list-item">
                    <NavLink onClick ={()=>logoutHandler()}  style={getActiveStyle}><LogoutIcon /></NavLink>
                </li>}
            </ul>

        </nav>
 
    );
}