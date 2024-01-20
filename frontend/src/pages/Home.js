import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";
import { fetchPosts } from "../features/posts/postsSlice";
import Posts from "./Posts";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  });
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Posts />
    </div>
  );
};

export default Home;
