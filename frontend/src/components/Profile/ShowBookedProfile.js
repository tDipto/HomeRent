import React from "react";

const ShowBookedProfile = ({ profiles }) => {
  const { name, email } = profiles;

  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item bg-white text-black">
          <div class="card">
            <div class="card-body">
              No: {} Name: {name} Email: {email}
            </div>
          </div>
        </li>
        <li className="list-group-item bg-green-500 text-white"></li>
      </ul>
    </div>
  );
};

export default ShowBookedProfile;
