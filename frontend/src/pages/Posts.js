import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostItem from "../components/Post/PostItem";

const Posts = () => {
  const { posts, isLoading, isError, error } = useSelector(
    (state) => state.posts
  );

  return (
    <>
      {!isLoading && !isError && (
        <div className="flex flex-row md:justify-start md:items-start justify-center items-center flex-wrap">
          {posts.map((post) => (
            <Link to={`/posts/${post.id}`} className="m-4" key={post.id}>
              <PostItem post={post} />
            </Link>
          ))}
        </div>
      )}
      {
        <div className="text-center mx-auto flex justify-center items-center">
          {isLoading && <h1>Loading....</h1>}
          {!isLoading && isError && error && <h1>{error}</h1>}
        </div>
      }
    </>
  );
};

export default Posts;
