import React from "react";
import { useNavigate } from "react-router-dom";
import blueBackgroundImage from "../assets/bg-img.jpg";
const Main = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/home");
  };
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
    </div>
  );
};

export default Main;
