import React from "react";
import { Link } from "react-router-dom";
import PostItem from "../Post/PostItem";

const UserPostsDetails = ({ books }) => {
  return (
    <div className="flex md:justify-start md:items-start justify-center items-center flex-wrap">
      {books.map((book) => (
        <Link to={`/posts/${book.post.id}`} className="m-4" key={book.id}>
          {console.log(book.post)}
          <PostItem post={book.post} />
        </Link>
      ))}
    </div>
  );
};

export default UserPostsDetails;
