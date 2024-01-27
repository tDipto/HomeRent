import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import blueBackgroundImage from "../assets/bg-img.jpg";
import { fetchPosts } from "../features/posts/postsSlice";
import Posts from "./Posts";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  });
  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${blueBackgroundImage})`,
        // Add blur effect
      }}
    >
    <div>
      <Posts/>
    </div>
    </div>
  );
};

export default Home;
