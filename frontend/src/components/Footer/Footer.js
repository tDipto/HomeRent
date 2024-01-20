import React from "react";

const Footer = () => {
  return (
    <footer
      style={{ position: "relative", bottom: 0 }}
      className="bg-gray-800 text-gray-300 py-4 mx-auto"
    >
      {/* <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-bold">Company Name</h3>
          <p className="text-sm">Address, City, Country</p>
          <p className="text-sm">Phone: 123-456-7890</p>
          <p className="text-sm">Email: info@example.com</p>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-blue-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-300">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-300">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-300">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div> */}
      <div className="text-center mt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} RentSpot. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
