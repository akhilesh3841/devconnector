import React from 'react';
import sd from '../assets/sd.jpg'; // Ensure the correct path
import Feedback from './Feedback.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Watchpage = () => {
  const navigate = useNavigate();

  const handlelogin = () => {
    navigate('/signup');
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="m-10 sm:m-3">
        <div
          className="hero h-screen bg-gradient-to-b from-neutral-950 to-transparent fixed top-0 left-0 w-full -z-10"
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <img src={sd} alt="Background" className="w-full h-full object-cover" />
          <div className="relative z-10"></div>
        </div>

        {/* Main Content */}
        <div className="">
          <div className="h-screen flex justify-center items-center text-neutral-content text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-black bg-opacity-70 py-8 px-6 rounded-lg max-w-4xl mx-4"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                Start Something Epic<span className="text-blue-500">.</span>
              </h1>
              <p className="mx-auto my-4 text-lg text-white font-semibold max-w-2xl">
                "A platform that connects developers through a matching system, allowing them to find and collaborate on projects based on shared skills and interests. Users can create profiles to showcase their work, participate in discussions, and engage with others to build valuable networking opportunities."
                <span className="font-semibold text-lg bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {' '}
                  - DeviNetwork
                </span>
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="my-3 border rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-lg text-white px-6 py-3 transform transition duration-300 hover:shadow-xl"
                onClick={handlelogin}
              >
                Create an Account
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="mx-8 bg-black py-8 z-50">
        <div className="px-4 md:px-20">
          <Feedback />
        </div>
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="my-6 border-spacing-44 py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-xl text-white transform transition duration-300 hover:shadow-xl"
          >
            Explore More
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Watchpage;