import axios from 'axios';
import React, { useEffect } from 'react';
import { addrequest } from '../utils/requestslice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Base_url } from '../utils/helper';
const Request = () => {
  const userdata = useSelector((store) => store.request.request);
  const dispatch = useDispatch();

  const reviewrequest = async (status, requestId) => {
    try {
      const response = await axios.post(
        `${Base_url}/req/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      console.log("Review Response:", response.data);
      // Refresh requests after review
      handlerequest();
    } catch (error) {
      console.error("Error reviewing request:", error);
    }
  };

  const handlerequest = async () => {
    try {
      const response = await axios.get(Base_url+"/userdata/pending/recived", {
        withCredentials: true,
      });

      console.log("API Response:", response.data);

      if (Array.isArray(response.data.data)) {
        dispatch(addrequest(response.data.data));
      } else {
        console.error("Invalid data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    handlerequest();
  }, [dispatch]);

  if (!userdata || !Array.isArray(userdata)) return null;

  if (userdata.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='h-screen flex flex-col bg-white justify-center items-center text-center'
      >
        <h1 className='text-3xl font-bold text-gray-800'>No Requests Found</h1>
        <p className='text-gray-600 mt-2'>You will receive connection requests when someone sends you one.</p>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300'
          >
            Go to Home
          </motion.button>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen bg-gray-100 py-6"
    >
      <div className="text-center mb-6 mt-10">
        <h1 className="text-3xl font-bold text-gray-800">Pending Requests</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {userdata.map((user) => {
          const { _id, firstName, lastName, age, gender, skills, photoUrl, about } = user.fromUserId;
          return (
            <motion.div
              key={_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center bg-white shadow-lg rounded-lg p-4 w-full max-w-md border border-gray-300 hover:shadow-xl transition duration-300"
            >
              <img
                className="w-20 h-20 rounded-full border-2 border-gray-300"
                src={photoUrl || 'https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg'}
                alt="User"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  {firstName} {lastName}
                </h3>
                <p className="text-gray-600 text-sm">{age} years old, {gender}</p>
                <p className="text-gray-700 text-sm">About: {about}</p>
                <p className="text-gray-700 text-sm">Skills: {skills}</p>
              </div>
              <div className="flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300"
                  onClick={() => reviewrequest('accepted', user._id)}
                >
                  Accept
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-300"
                  onClick={() => reviewrequest('rejected', user._id)}
                >
                  Reject
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Request;