import React, { useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import blueBackgroundImage from "../assets/bg-img.jpg";
import { fetchPosts } from "../features/posts/postsSlice";
import Posts from "./Posts";

const Home = () => {
  
  const { posts, isLoading, isError, error } = useSelector(
    (state) => state.posts
  );
  const { books } = useSelector((state) => state.books);
  
  
  const vacants = posts.filter((post)=> post.seatCapacity>0 ||post.seatCapacity==0);
  
  const getTotalTitles = () => {
    return vacants.length;
  };
  const getTotalVacantCapacity = () => {
    return vacants.reduce((total, post) => total + post.seatCapacity, 0);
  };

  return (
    <div
    className="flex flex-row  w-[100%]   pt-1 mt-10"
    style={{
      backgroundImage: `url(${blueBackgroundImage})`,
      // Add blur effect
    }}
    >
    <div className="mt-20">
      {/* {vacants.map(post=><div key={post.id}>
      <h1>
       {post.title}
      </h1>
      </div>)} */}
       
      <div className="flex items-center justify-center text-center font-serif" style={{ backgroundColor: 'rgb(168, 162, 158)' }}>
          <div className="mr-6 p-4 flex flex-col items-center justify-center ">
              <div className="mb-2 text-center lining-nums">
                  <h1 className="font-bold text-5xl text-white">{getTotalTitles()}</h1>
              </div>
              <div>
                  <p className="text-white">Empty Houses</p>
              </div>
          </div>
          <div className="mr-6 p-4 flex flex-col items-center lining-nums">
              <div className="mb-2">
                  <h1 className="text-5xl font-bold text-white">{getTotalVacantCapacity()}</h1>
              </div>
              <div>
                  <p className="text-white">Vacant Seats</p>
              </div>
          </div>
      </div>



      <Posts/>
    </div>
    
    </div>
  );
};

export default Home;
