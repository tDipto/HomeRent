import React from "react";
import { useNavigate } from "react-router-dom";
import blueBackgroundImage from "../assets/bg-img.jpg";
// import Slider from 'react-slick';
import { useDispatch } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import carasol_1 from "./Images/carasol_1.jpg";
import carasol_2 from "./Images/carasol_2.jpg";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goHome = () => {
    navigate("/home");
  };

  // useEffect(() => {
  //   dispatch(fetchUser());
  // }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const imageSources = [
    "./Images/carasol_1.jpg",
    "./Images/carasol_2.jpg",
    "./Images/carasol_3.jpg",
    // Add more image paths as needed
  ];
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${blueBackgroundImage})`,
        // Add blur effect
      }}
    >
      <button
        onClick={goHome}
        className="px-6 py-3 text-white bg-custom1 rounded-lg text-xl font-semibold shadow-md hover:bg-custom2 transition duration-300"
      >
        Go Explore Home
      </button>
      <div>
        <img src={carasol_1}/>
      </div>
      </div>
  );
};

export default Main;
