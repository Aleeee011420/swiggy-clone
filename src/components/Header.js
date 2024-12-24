import React, { useState,useContext } from "react";
import foodFireLogo from "../constants/image.jpg";
import { Link }  from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {userContext} from "../constants/userContext";



const Title = () => (
  <a href="/">
    <img
      className="h-full w-auto" 
      src={foodFireLogo}
      alt="Food Fire Logo"
      title="Food Fire"
    />
  </a>
);

const Header = () => {
  const [isLoggedin, setIsLoggedin] = useState(true);
  const navigate=useNavigate();

  const {user}=useContext(userContext);

  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 shadow-md fixed w-full top-0 z-10">
      
      <div className="h-12">
        <Title />
      </div>

      
      <div className="flex items-center space-x-6">
        <ul className="flex items-center space-x-6">
          <li  className="hover:text-yellow-400 cursor-pointer">
            <Link to="/">Home</Link></li>
          <li  className="hover:text-yellow-400 cursor-pointer">
            <Link to="/about">About</Link></li>
          <li   className="hover:text-yellow-400 cursor-pointer">
            <Link to="/contact">Contact</Link></li>
            <li  className="hover:text-yellow-400 cursor-pointer">
            <Link to="/cart">Cart</Link></li>
          <li className="hover:text-yellow-400 cursor-pointer">
            <i className="fa-solid fa-cart-shopping"></i>
          </li>
        </ul>
      <h2 classname="font-bold text-2xl border border-red "> App created by {user.name}</h2>
        
        <div>
          {isLoggedin ? (
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => setIsLoggedin(false)}
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              onClick={() =>navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
