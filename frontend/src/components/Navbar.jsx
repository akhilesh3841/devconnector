import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { removeUser } from "../utils/userslice";
import { toast } from "react-toastify";
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiUsers } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiVipCrownLine } from "react-icons/ri";
import logo from "../assets/logo.webp";
import { Base_url } from "../utils/helper";

const Navbar = () => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${Base_url}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      toast.success("Logged Out!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed! Please try again.");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg px-2 py-3 md:px-2 md:py-2 w-full h-13 absolute top-0 z-50  ">
      <div className="max-w-7xl mx-auto flex justify-between items-center ">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3">
          <img 
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white shadow-sm" 
            src={logo} 
            alt="Logo" 
          />
          <Link 
            to="/" 
            className="text-xl md:text-2xl font-bold text-white hover:text-gray-200 transition duration-300"
          >
            DevtNetwork
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {user ? (
            <>
              <Link 
                to="/" 
                className="text-white hover:text-gray-200 transition duration-300 flex items-center space-x-1"
              >
                <FiHome size={20} />
                <span>Home</span>
              </Link>
              
              <Link 
                to="/connection" 
                className="text-white hover:text-gray-200 transition duration-300 flex items-center space-x-1"
              >
                <FiUsers size={20} />
                <span>Connections</span>
              </Link>
              
              <Link 
                to="/request" 
                className="text-white hover:text-gray-200 transition duration-300 flex items-center space-x-1"
              >
                <IoMdNotificationsOutline size={20} />
                <span>Requests</span>
              </Link>
              
              <Link 
                to="/premium" 
                className="text-white hover:text-gray-200 transition duration-300 flex items-center space-x-1"
              >
                <RiVipCrownLine size={20} />
                <span>Premium</span>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)} 
                  className="flex items-center space-x-2 focus:outline-none"
                  aria-label="User menu"
                >
                  <img
                    src={user.photoUrl || "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm cursor-pointer hover:border-gray-300 transition duration-300"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-20 py-1">
                    <Link 
                      to="/profile" 
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition duration-300"
                    >
                      <FiUser className="mr-3" />
                      <span>Profile</span>
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="w-full text-left flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition duration-300"
                    >
                      <FiLogOut className="mr-3" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex space-x-4">
              <Link 
                to="/login" 
                className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-100 hover:text-blue-700 transition duration-300"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-blue-600 shadow-lg py-4 px-6">
            {user ? (
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="text-white hover:text-gray-200 transition duration-300 flex items-center space-x-3 py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiHome size={20} />
                  <span>Home</span>
                </Link>
                
                <Link 
                  to="/connection" 
                  className="text-white hover:text-gray-200 transition duration-300 flex items-center space-x-3 py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiUsers size={20} />
                  <span>Connections</span>
                </Link>
                
                <Link 
                  to="/request" 
                  className="text-white hover:text-gray-200 transition duration-300 flex items-center space-x-3 py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <IoMdNotificationsOutline size={20} />
                  <span>Requests</span>
                </Link>
                
                <Link 
                  to="/premium" 
                  className="text-white hover:text-gray-200 transition duration-300 flex items-center space-x-3 py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <RiVipCrownLine size={20} />
                  <span>Premium</span>
                </Link>
                
                <Link 
                  to="/profile" 
                  className="text-white hover:text-gray-200 transition duration-300 flex items-center space-x-3 py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiUser size={20} />
                  <span>Profile</span>
                </Link>
                
                <button 
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }} 
                  className="w-full text-left text-white hover:text-gray-200 transition duration-300 flex items-center space-x-3 py-2"
                >
                  <FiLogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/login" 
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-100 hover:text-blue-700 transition duration-300 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition duration-300 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;