import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import AddPost from "./components/Post/AddPost";
import BookPost from "./components/Post/BookPost";
import DeletePost from "./components/Post/DeletePost";
import PostDescription from "./components/Post/PostDescription";
import CreateProfile from "./components/Profile/CreateProfile";
import UpdateProfile from "./components/Profile/UpdateProfile";
import Registration from "./components/Register/Register";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/create" element={<AddPost />} />
        <Route path="/posts/:postId" element={<PostDescription />} />
        <Route path="/posts/:postId/delete" element={<DeletePost />} />
        <Route path="/books/:postId" element={<BookPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/create" element={<CreateProfile />} />
        <Route
          path="/profile/edit"
          element={
            <PrivateRoutes>
              <UpdateProfile />
            </PrivateRoutes>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
