import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchAllUsers, fetchUser } from "../../features/auth/authSlice";
import { related } from "../../features/posts/postsSlice";
import { api } from "../../utils/api";
import axiosInstance from "../../utils/axios";

import ShowBookedProfile from "../Profile/ShowBookedProfile";
import GoogleMap from "./GoogleMap";
import RelatedPosts from "./RelatedPosts";

async function fetchPosts(postId) {
  try {
    const response = await axiosInstance.get(`${api}/posts/${postId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

const PostDescription = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    isError,
    error,
    isLoggedIn,
    user,
    posts,
    isRegistered,
    fetchAllUser,
    allUser,
  } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [message, setMessage] = useState("");
  const { postId } = useParams();

  let map = null;
  let latitude, longitude;
  const coordinate = post?.coordinates;
  if (coordinate) {
    [latitude, longitude] = coordinate.split(",");
    map = <GoogleMap latitude={latitude} longitude={longitude} />;
  }

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

    dispatch(fetchUser());
    dispatch(fetchAllUsers());
  }, [postId, dispatch]);

  const bookeditems = post.book;

  let bookedId = bookeditems?.map((item) => item.userId);
  let usersInBookedId =
    allUser && bookedId
      ? allUser.filter((user) => bookedId.includes(user.id))
      : [];

  return (
    <div className="">
      <div className="bg-black">hi</div>
      <div className="px-20">
        <div>ss</div>
        {/* {console.log(bookedId)} */}
        <div className="mx-auto  flex flex-row bg-slate-400 pt-20">
          <div className="w-[50%] bg-white p-8">
            {post.photos && post.photos.length > 0 && (
              <div className="mt-4">
                <h3 className="text-2xl font-semibold mb-4">Photos:</h3>
                <div className="flex flex-wrap">
                  {post.photos.map((photo, index) => (
                    <div key={index} className="w-[45%] p-2">
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
          <div className="w-[50%] bg-white p-8">
            <div className="p-4">
              <h2 className="text-3xl font-semibold mb-4">{post.title}</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-lg">
                    <strong>Seat Capacity:</strong> {post.seatCapacity}
                  </p>
                  <p className="text-lg"></p>
                  <p className="text-lg">
                    <strong>Type:</strong> {post.type}
                  </p>
                  <p className="text-lg">
                    <strong>Available:</strong> {post.available ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <p className="text-lg">
                    <strong>Contact:</strong> {post.contact}
                  </p>
                  <p className="text-lg">
                    <strong>Details:</strong> {post.details}
                  </p>
                  <p className="text-lg">
                    <strong>Location:</strong> {post.location}
                  </p>
                </div>
              </div>

              <div className="flex flex-col mt-4">
                {/* <button
                className="py-3 mb-4 bg-blue-800 w-full rounded-md hover:bg-blue-600 cursor-pointer"
                type="button"
              >
                <a
                  href={post.coordinates}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white"
                >
                  See Location
                </a>
              </button> */}

                {(role === null || role === "BUYER" || !isRegistered) && (
                  <button
                    onClick={handleBooked}
                    className="py-3 bg-custom1 text-white w-full rounded-md hover:bg-custom2 cursor-pointer"
                    type="button"
                  >
                    Book Now
                  </button>
                )}

                {(role === "ADMIN" || role === "SELLER") &&
                  post.userId === user.id && (
                    <div>
                      <button
                        className="py-3 bg-blue-800 w-full rounded-md hover:bg-blue-600 cursor-pointer mb-2"
                        type="button"
                      >
                        <Link
                          to={`/posts/${postId}/edit`}
                          className="text-white"
                        >
                          Edit
                        </Link>
                      </button>

                      <button
                        className="py-3 bg-red-800 w-full rounded-md hover:bg-red-600 cursor-pointer"
                        type="button"
                      >
                        <Link
                          to={`/posts/${postId}/delete`}
                          className="text-white"
                        >
                          Delete
                        </Link>
                      </button>
                    </div>
                  )}
              </div>
              {<p className="font-bold text-red-600">{message}</p>}
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="bg-success text-center mb-4">Show map</div>
            {map}
          </div>
        </div>
        {post.userId === user.id && (
          <div>
            <h3 className="bg-custom font-bold  font-serif  text-center p-3 ">
              Booked Profiles
            </h3>
            <div className="text-center">
              {usersInBookedId.length !== 0 ? (
                usersInBookedId.map((profile, index) => (
                  <ShowBookedProfile profiles={profile} count={index + 1} />
                ))
              ) : (
                <p>No booked Student</p>
              )}
            </div>
          </div>
        )}

        <RelatedPosts />
      </div>
    </div>
  );
};

export default PostDescription;
