import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import blueBackgroundImage from "../../assets/bg-img.jpg";
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
    // console.log(response);
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
  const seatCapacity = post?.seatCapacity;
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
    <div
      className="mt-24"
      style={{
        backgroundImage: `url(${blueBackgroundImage})`,
      }}
    >
      {/* main */}
      <div class="grid grid-col-2 mx-20 ">
        {/* image  */}
        <div class="bg-white pb-6 m-2 mockup-window border bg-base-300">
          <div className="pl-6 pb-2 ">
            <h3 className="chat-bubble  mb-4">Photos</h3>
            {/* {post.photos && post.photos.length > 0 && (
              <div className="flex flex-wrap">
                {post.photos.map((photo, index) => (
                  <div key={index} className="w-[40%]">
                    <img
                      src={photo}
                      alt={`PhotoNo ${index + 1}`}
                      className="rounded-md w-full"
                    />
                  </div>
                ))}
              </div>
            )} */}
            {post.photos && post.photos.length > 0 && (
              <div className="carousel w-[55%]">
                {post.photos.map((photo, index) => (
                  <div
                    key={index}
                    className={`carousel-item relative w-full overflow-hidden ${
                      index === 0 ? "active" : ""
                    }`}
                    id={`slide${index}`}
                  >
                    <img
                      src={photo}
                      alt={`PhotoNo ${index + 1}`}
                      className="w-full"
                    />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <a href={`#slide${index - 1}`} className="btn btn-circle">
                        ❮
                      </a>
                      <a href={`#slide${index + 1}`} className="btn btn-circle">
                        ❯
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* address  */}
        <div class="bg-white m-2 pt-6 mockup-window border bg-base-300">
          <div className="px-6">
            <div class="chat-bubble mb-2">{post.title}</div>

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

                {post.seatCapacity === 0 ? (
                  <button
                    className="py-3 bg-red-500 text-white w-full rounded-md cursor-not-allowed"
                    type="button"
                    disabled
                  >
                    Not Available
                  </button>
                ) : (
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

        {/* map  */}
        <div class="col-span-2 m-2 pt-5 mockup-window border bg-base-300 ">
          <div className="bg-success text-center">Show map</div>
          <div className="px-6 h-[440px] py-2">{map}</div>
        </div>
      </div>
      <div>
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
      </div>
      <div className="px-20">
        <RelatedPosts />
      </div>
    </div>
  );
};

export default PostDescription;
