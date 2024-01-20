import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import axiosInstance from "../../utils/axios";

const CreateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await axiosInstance.put(`${api}/profile/edit`, {
        ...formData,
      });

      if (response.data) {
        navigate("/profile");

        setFormData({
          address: "",

          phone: "",
        });
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
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        placeholder="Address"
        className="w-full border rounded-md p-2 mb-4"
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Phone"
        className="w-full border rounded-md p-2 mb-4"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update
      </button>
    </form>
  );
};

export default CreateProfile;
