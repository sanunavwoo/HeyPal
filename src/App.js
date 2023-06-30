import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import { Home } from './pages/HomePage/Home';
import { Login } from './pages/LoginPage/Login';
import { Signup } from './pages/SignupPage/Signup';
import { PrivateRoute } from './component/PrivateRoute';
import { Explore } from './pages/ExplorePage/Explore';
import { LikedPosts } from './pages/LikedPostsPage/LikedPosts';
import { Bookmarks } from './pages/BookmarksPage/Bookmarks';
import { PostDetail } from './pages/PostDetailPage/PostDetail';
import { Profile } from './pages/ProfilePage/Profile';
import { Logout } from './pages/LogoutPage/Logout';


function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element= 
        {
          <PrivateRoute>
            <Home />
          </PrivateRoute>  
        } 

        />
        <Route path="/explore" element= 
        {
          <PrivateRoute>
            <Explore />
          </PrivateRoute>  
        } 

        />
        <Route path="/likedPosts" element= 
        {
          <PrivateRoute>
            <LikedPosts />
          </PrivateRoute>  
        } 

        />
        <Route path="/bookmarks" element= 
        {
          <PrivateRoute>
            <Bookmarks />
          </PrivateRoute>  
        } 

        />
          <Route path="/post/:postID" element= 
        {
          <PrivateRoute>
            <PostDetail />
          </PrivateRoute>  
        } 

        />
         <Route path="/profile/:username" element= 
        {
          <PrivateRoute>
            <Profile />
          </PrivateRoute>  
        } 

        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
