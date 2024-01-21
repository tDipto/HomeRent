import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { authSuccess, fetchLoggedOutUser } from "./features/auth/authSlice";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const authCheck = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        // console.log(token);
        dispatch(fetchLoggedOutUser());
      } else {
        const expireTime = new Date(localStorage.getItem("expireTime"));

        if (expireTime <= new Date()) {
          dispatch(fetchLoggedOutUser());
        } else {
          const role = localStorage.getItem("role");
          // console.log(token, userId);
          dispatch(authSuccess({ token, role }));
        }
      }
    };
    authCheck();
  }, [isLoggedIn]);

  let routes = null;
  if (isLoggedIn) {
    routes = (
      <>
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
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </>
    );
  }
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        {routes}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
