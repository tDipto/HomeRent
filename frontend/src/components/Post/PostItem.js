import React from "react";

const PostItem = ({ post }) => {
  const {
    title,
    photos,
    seatCapacity,
    price,
    type,
    available,
    contact,
    details,
    location,
    coordinates,
  } = post;
  const isAvailable = seatCapacity > 0 ? "Available" : "Not Available";
  const textColorClass = seatCapacity > 1 ? "text-green-500" : seatCapacity === 0 ? "text-red-500" : "text-gray-700";
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg  ">
      <img className=" w-[300px] h-[200px]" src={`${photos[0]}`} alt={title} />
      <div className="flex flex-row justify-around">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{location}</p>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">Price: {price}</p>
          <p className="text-gray-700 text-base">Vacant: {seatCapacity}</p>
          <p className={`text-base ${textColorClass}`}>{isAvailable}</p>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
