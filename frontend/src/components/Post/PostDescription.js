import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { related } from "../../features/posts/postsSlice";
import { api } from "../../utils/api";
import axiosInstance from "../../utils/axios";
import RelatedPosts from "./RelatedPosts";

async function fetchPosts(postId) {
  try {
    const response = await axiosInstance.get(`${api}/posts/${postId}`);

    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

const PostDescription = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, error, isLoggedIn, user, posts, isRegistered } =
    useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [message, setMessage] = useState("");
  const { postId } = useParams();

  const role = user?.role;

  const handleBooked = () => {
    if (isLoggedIn) {
      navigate(`/books/${postId}`);
    } else {
      setMessage("You are not logged in!, Please login to your account first!");
      navigate(`/login`);
    }
  };

  useEffect(() => {
    fetchPosts(postId).then((data) => {
      setPost(data);
    });
    dispatch(related(postId));
  }, [postId, dispatch]);

  return (
    <>
      <div className=" mx-auto max-h-screen flex flex-row bg-slate-400 pt-1">
        <div className="w-[50%]  bg-white p-5">
          {post.photos && post.photos.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Photos:</h3>
              <div className="flex flex-wrap">
                {post.photos.map((photo, index) => (
                  <div key={index} className="w-[40%] p-2">
                    <img
                      src={photo}
                      alt={`PhotoNo ${index + 1}`}
                      className="rounded-md w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-[50%]  bg-white p-5">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Seat Capacity:</strong> {post.seatCapacity}
                </p>
                <p>
                  <strong>Price:</strong> {post.price}
                </p>
                <p>
                  <strong>Type:</strong> {post.type}
                </p>
                <p>
                  <strong>Available:</strong> {post.availabe ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Contact:</strong> {post.contact}
                </p>
                <p>
                  <strong>Details:</strong> {post.details}
                </p>
                <p>
                  <strong>Location:</strong> {post.location}
                </p>
              </div>
            </div>

            <div className="flex flex-col m-1 pt-3">
              <button
                className="py-2 mb-3 bg-blue-800 w-full rounded-btn hover:bg-blue-600 cursor-pointer"
                type="button"
              >
                <a href={post.coordinates} target="_blank" rel="noreferrer">
                  See Location
                </a>
              </button>

              {(role === null || role === "BUYER") && (
                <button
                  onClick={handleBooked}
                  className="py-2 bg-blue-800 w-full rounded-btn hover:bg-blue-600 cursor-pointer"
                  type="button"
                >
                  Book Now
                </button>
              )}
              {!isRegistered && (
                <button
                  onClick={handleBooked}
                  className="py-2 bg-blue-800 w-full rounded-btn hover:bg-blue-600 cursor-pointer"
                  type="button"
                >
                  Book Now
                </button>
              )}
              {(role === "ADMIN" || role === "SELLER") && (
                <button
                  className="py-2 bg-red-800 w-full rounded-btn hover:bg-red-600 cursor-pointer"
                  type="button"
                >
                  <Link to={`/posts/${postId}/delete`}>Delete</Link>
                </button>
              )}
            </div>
            {<p className="font-bold text-red-600">{message}</p>}
          </div>
        </div>
      </div>
      <RelatedPosts />
    </>
  );
};

export default PostDescription;
