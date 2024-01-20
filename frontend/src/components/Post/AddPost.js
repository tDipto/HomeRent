import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import axiosInstance from "../../utils/axios";

const AddPost = () => {
  const { isLoading, isError, error, isLoggedIn, user, isRegistered } =
    useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const handleImageUpload = async (e) => {
    setLoading(true);
    const files = e.target.files;

    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
      data.append("upload_preset", "software");
      data.append("tags", "multiple_images");
      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/du55ossud/image/upload`,
          data
        );

        setImages((prevImages) => [
          ...prevImages,
          prevImages.push(res.data.secure_url),
        ]);
        setLoading(true);
      } catch (err) {
        console.error("Error uploading image: ", err);
      }
    }
    setLoading(false);
  };

  const [formData, setFormData] = useState({
    title: "",
    seatCapacity: 0,
    price: 0,
    photos: images,
    type: "",
    available: true,
    contact: "",
    details: "",
    location: "",
    coordinates: "",
  });

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

    if (
      formData.title !== "" &&
      formData.seatCapacity !== 0 &&
      formData.price !== 0 &&
      formData.photos.length > 0 &&
      formData.type !== "" &&
      formData.contact !== "" &&
      formData.details !== "" &&
      formData.location !== "" &&
      formData.coordinates !== ""
    ) {
      try {
        const response = await axiosInstance.post(`${api}/posts/create/`, {
          ...formData,
        });

        console.log(response.data);

        if (response.data) {
          navigate("/");
          setFormData({
            title: "",
            seatCapacity: 0,
            price: 0,
            photos: [],
            type: "",
            contact: "",
            details: "",
            location: "",
            coordinates: "",
          });
        }
      } catch (error) {
        setMessage(error);
      }
    } else {
      setMessage("Please fill up all the input fields!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" w-[90vh]  mx-auto my-5 p-4 bg-gray-100 rounded-lg"
    >
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Title"
        className="w-full border rounded-md p-2 mb-4 text-black"
      />
      <input
        type="number"
        name="seatCapacity"
        value={formData.seatCapacity}
        onChange={handleInputChange}
        placeholder="Seat Capacity"
        className="w-full border rounded-md p-2 mb-4 text-black"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        placeholder="Price"
        className="w-full border rounded-md p-2 mb-4 text-black"
      />
      <input
        type="text"
        name="type"
        value={formData.type}
        onChange={handleInputChange}
        placeholder="Type"
        className="w-full border rounded-md p-2 mb-4 text-black"
      />

      <input
        type="text"
        name="contact"
        value={formData.contact}
        onChange={handleInputChange}
        placeholder="Contact"
        className="w-full border rounded-md p-2 mb-4 text-black"
      />
      <textarea
        name="details"
        value={formData.details}
        onChange={handleInputChange}
        placeholder="Details"
        className="w-full border rounded-md p-2 mb-4 text-black"
        rows="4"
      ></textarea>
      <input
        type="text"
        name="location"
        value={formData.location.toLowerCase().trim()}
        onChange={handleInputChange}
        placeholder="Location"
        className="w-full border rounded-md p-2 mb-4 text-black"
      />
      <input
        type="text"
        name="coordinates"
        value={formData.coordinates}
        onChange={handleInputChange}
        placeholder="Coordinates"
        className="w-full border rounded-md p-2 mb-4 text-black"
      />
      <input
        type="file"
        onChange={handleImageUpload}
        multiple
        className="mb-4"
      />

      {loading && <p className="text-red-500">Uploading...</p>}
      {<p className="text-red-600 m-3">{message}</p>}
      {formData.photos.length > 0 && (
        <div className="mb-4 flex flex-row">
          {formData.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Photo_no ${index}`}
              className="w-20 h-20 object-cover mr-2 mb-2"
            />
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default AddPost;
