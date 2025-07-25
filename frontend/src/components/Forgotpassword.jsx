import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { motion } from 'framer-motion';
import { Base_url } from '../utils/helper';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(Base_url+'/api/forgotpass', {
        emailId: email,
      });
      toast.success(res.data.message);
      setEmail(""); // clear input on success
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 to-purple-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">Forgot Password</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Registered Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border text-gray-950 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition-colors duration-300"
          >
            Send Reset Link
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPassword;
