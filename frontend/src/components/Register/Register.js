import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerImage from "../../assets/images/signup.svg";
import axiosInstance from "../../utils/axios";
const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axiosInstance.post("/users/register", formData);
      setSuccessMessage("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.response.data);
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
    setTimeout(() => {
      setError("");
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div
      className="flex flex-col justify-center items-center  opacity-100"
      style={{}}
    >
      <div className="flex m-12 p-12 flex-row w-[70%] justify-center relative opacity-100  items-center h-[50%] bg-slate-50 border ">
        <div className="flex flex-col  justify-center items-center   w-[80vh] h-[90%]">
          <img
            src={registerImage}
            alt="login_image"
            className="w-full h-[70vh] mr-10"
          />
        </div>
        <div className="flex justify-center items-center w-[80vh] h-[90%] ml-10">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[70vh] h-[90%]"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                required
                placeholder="Enter your username"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Role
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="role"
                type="text"
                required
                placeholder="BUYER or SELLER"
                value={formData.role.toUpperCase()}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  isLoading && "opacity-50 cursor-not-allowed"
                }`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {successMessage && (
              <p className="text-green-500 text-sm mt-2">{successMessage}</p>
            )}
            <div className="mt-4 text-center">
              <h3>
                Already have an account?
                <strong className="m-1 text-indigo-700">
                  <Link to="/login">Login</Link>
                </strong>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
