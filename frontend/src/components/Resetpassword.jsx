import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Base_url } from '../utils/helper';
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(Base_url+`/api/reset-password/${token}`, {
        password: newPassword,
      });
      setMessage(res.data.message);
      setNewPassword('');
      setTimeout(() => navigate('/login'), 2000); // Delay navigation for 2s
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="border text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-purple-700 transition-colors duration-300"
          >
            Reset Password
          </motion.button>
        </form>

        {message && (
          <motion.p
            className="mt-4 text-center text-sm font-medium text-green-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ResetPassword;
