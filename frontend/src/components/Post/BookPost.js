import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/api";
import axiosInstance from "../../utils/axios";

const BookPost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({});

  const { postId } = useParams();

  async function fetchPosts(postId) {
    try {
      const response = await axiosInstance.get(`${api}/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  useEffect(() => {
    fetchPosts(postId).then((data) => {
      setPost(data);
    });
  }, [postId]);

  const [formData, setFormData] = useState({
    seatCapacity: 0,
  });

  console.log(formData);
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? parseInt(value) : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(`${api}/books/${postId}`, {
        ...formData,
      });
      if (response.data) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" w-[90vh]  mx-auto my-5 p-4 bg-gray-100 rounded-lg"
    >
      <label>
        Number of Seat:
        <input
          type="number"
          name="seatCapacity"
          value={formData.seatCapacity}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2 mb-4"
        />
      </label>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Book Now
      </button>
    </form>
  );
};

export default BookPost;
