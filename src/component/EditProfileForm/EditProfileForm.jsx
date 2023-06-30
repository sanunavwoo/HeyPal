import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./EditProfileForm.css";

export function EditProfileForm({setIsEditProfileFlag, profileDetailsToBeUpdated}){

    console.log("profileDetailsToBeUpdated::",profileDetailsToBeUpdated);

    const {getAllUsers,editProfile}= useContext(UserContext);

    const initialProfile= {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        bio: "",
        bookmarks:[],
        avatarUrl:"",
        website: "",
        createdAt: "",
        
        following: [],
        followers: [],
    };

    const [editProfileFormData,setEditProfileFormData]= useState(initialProfile);

    function handleEditProfile(e){
        console.log("Inside handleEditProfile");
        e.preventDefault();
        editProfile(editProfileFormData);

        setIsEditProfileFlag(false);
    }

    useEffect(()=>{
        getAllUsers();
        if(profileDetailsToBeUpdated!==0){
            setEditProfileFormData(()=>({...profileDetailsToBeUpdated}));
        }
    },[]);

    return(
        <>
            <div className="editProfileForm-container">
                <div className="editProfileForm">
                         <h2>Edit Profile</h2>   
                         <form onSubmit={handleEditProfile}>
                            
                            <label>First Name</label>
                            <input
                                type="text"
                                placeholder="Enter First Name"
                                name="firstName"
                                value= {editProfileFormData.firstName}
                                required
                                onChange={(e)=>setEditProfileFormData((editProfileFormData)=>({
                                    ...editProfileFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             />
                              <label>Last Name</label>
                              <input
                                type="text"
                                placeholder="Enter Last Name"
                                name="lastName"
                                value= {editProfileFormData.lastName}
                                required
                                onChange={(e)=>setEditProfileFormData((editProfileFormData)=>({
                                    ...editProfileFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             />
                              <label>Username</label>
                            <input
                                type="text"
                                placeholder="Enter Username"
                                name="username"
                                value= {editProfileFormData.username}
                                disabled
                                required
                                onChange={(e)=>setEditProfileFormData((editProfileFormData)=>({
                                    ...editProfileFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             /> 
                              <label>Password</label>
                             <input
                                type="text"
                                placeholder="Enter Password"
                                name="password"
                                value= {editProfileFormData.password}
                                required
                                onChange={(e)=>setEditProfileFormData((editProfileFormData)=>({
                                    ...editProfileFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             /> 
                              <label>Bio</label>
                             <input
                                type="text"
                                placeholder="Enter Bio"
                                name="bio"
                                value= {editProfileFormData.bio}
                                required
                                onChange={(e)=>setEditProfileFormData((editProfileFormData)=>({
                                    ...editProfileFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             />  
                             {/* <input
                                type="text"
                                placeholder="Enter Avatar URL"
                                name="avatarUrl"
                                value= {editProfileFormData.avatarUrl}
                                required
                                onChange={(e)=>setEditProfileFormData((editProfileFormData)=>({
                                    ...editProfileFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             />  */}
                             <label>Portfolio URL</label>
                               <input
                                type="text"
                                placeholder="Enter Website"
                                name="website"
                                value= {editProfileFormData.website}
                                required
                                onChange={(e)=>setEditProfileFormData((editProfileFormData)=>({
                                    ...editProfileFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             /> 
                              <p>Choose your Avatar</p>
                            <div className="avatar-radio-div">
                               
                                <input className="avatar-radio-inputs"
                                type="radio" name="avatarUrl" 
                                id="avatar1" value="https://res.cloudinary.com/dtrjdcrme/image/upload/v1651554256/socialmedia/avatars/jane-doe_il3cvx.webp"
                                onChange={(e)=>setEditProfileFormData((editProfileFormData)=>({
                                    ...editProfileFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                                />
                                <label for="avatar1">
                                <img 
                                    src="https://res.cloudinary.com/dtrjdcrme/image/upload/v1651554256/socialmedia/avatars/jane-doe_il3cvx.webp" 
                                    alt="I'm sad" />
                                </label>

                                <input className="avatar-radio-inputs"
                                type="radio" name="avatarUrl" 
                                id="avatar2"value="https://res.cloudinary.com/dtrjdcrme/image/upload/v1651554207/socialmedia/avatars/john-doe_gbkuda.webp" 
                                onChange={(e)=>setEditProfileFormData((editProfileFormData)=>({
                                    ...editProfileFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                                />
                                <label for="avatar2">
                                <img 
                                    src="https://res.cloudinary.com/dtrjdcrme/image/upload/v1651554207/socialmedia/avatars/john-doe_gbkuda.webp" 
                                    alt="I'm sad" />
                                </label>

                                <input className="avatar-radio-inputs"
                                type="radio" name="avatarUrl" 
                                id="avatar3"value="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png" 
                                onChange={(e)=>setEditProfileFormData((editProfileFormData)=>({
                                    ...editProfileFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                                />
                                <label for="avatar3">
                                <img 
                                    src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png" 
                                    alt="I'm sad" />
                                </label>

                                <input className="avatar-radio-inputs"
                                type="radio" name="avatarUrl" 
                                id="avatar4"value="https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png" 
                                onChange={(e)=>setEditProfileFormData((editProfileFormData)=>({
                                    ...editProfileFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                                />
                                <label for="avatar4">
                                <img 
                                    src="https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png" 
                                    alt="I'm sad" />
                                </label>

                                <input className="avatar-radio-inputs"
                                type="radio" name="avatarUrl" 
                                id="avatar5"value="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png" 
                                onChange={(e)=>setEditProfileFormData((editProfileFormData)=>({
                                    ...editProfileFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                                />
                                <label for="avatar5">
                                <img 
                                    src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png" 
                                    alt="I'm sad" />
                                </label>

                                <input className="avatar-radio-inputs"
                                type="radio" name="avatarUrl" 
                                id="avatar6"value="https://www.clipartmax.com/png/middle/257-2572603_user-man-social-avatar-profile-icon-man-avatar-in-circle.png" 
                                onChange={(e)=>setEditProfileFormData((editProfileFormData)=>({
                                    ...editProfileFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                                />
                                <label for="avatar6">
                                <img 
                                    src="https://www.clipartmax.com/png/middle/257-2572603_user-man-social-avatar-profile-icon-man-avatar-in-circle.png" 
                                    alt="I'm sad" />
                                </label>

                                <input className="avatar-radio-inputs"
                                type="radio" name="avatarUrl" 
                                id="avatar7"value="https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png" 
                                onChange={(e)=>setEditProfileFormData((editProfileFormData)=>({
                                    ...editProfileFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                                />
                                <label for="avatar7">
                                <img 
                                    src="https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png" 
                                    alt="I'm sad" />
                                </label>

                                <input className="avatar-radio-inputs"
                                type="radio" name="avatarUrl" 
                                id="avatar8"value="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png" 
                                onChange={(e)=>setEditProfileFormData((editProfileFormData)=>({
                                    ...editProfileFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                                />
                                <label for="avatar8">
                                <img 
                                    src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png" 
                                    alt="I'm sad" />
                                </label>

                            </div>
{/* 
                             <select
                                name="avatarUrl"
                                value= {editProfileFormData.avatarUrl}
                                required
                                onChange={(e)=>setEditProfileFormData((editProfileFormData)=>({
                                    ...editProfileFormData,
                                    [e.target.name]: e.target.value,
                                }))}
                             >
                                <option value="https://res.cloudinary.com/dtrjdcrme/image/upload/v1651554256/socialmedia/avatars/jane-doe_il3cvx.webp">
                                    <img src="https://res.cloudinary.com/dtrjdcrme/image/upload/v1651554256/socialmedia/avatars/jane-doe_il3cvx.webp" />
                                </option>
                                <option value="https://res.cloudinary.com/dtrjdcrme/image/upload/v1651554207/socialmedia/avatars/john-doe_gbkuda.webp">
                                    <img src="https://res.cloudinary.com/dtrjdcrme/image/upload/v1651554207/socialmedia/avatars/john-doe_gbkuda.webp" />
                                </option>
                             </select>
                              */}
                             <button type="submit">Submit</button>
                             <button onClick={()=>setIsEditProfileFlag(false)}>Cancel</button>
                        </form>
                </div>   
            </div>
        </>
    );

}