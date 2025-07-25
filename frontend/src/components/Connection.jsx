import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addconnection } from '../utils/connectionslice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Base_url } from '../utils/helper';
import { FiMessageSquare, FiHome } from 'react-icons/fi';

const Connection = () => {
  const connectiondata = useSelector((store) => store.connection.connection);
  console.log(connectiondata);
  const dispatch = useDispatch();

  const handleAcceptedRequest = async () => {
    try {
      const response = await axios.get(`${Base_url}/userdata/pending/accepted`, {
        withCredentials: true
      });
      dispatch(addconnection(response.data.data));
    } catch (error) {
      console.error("Error fetching accepted requests:", error);
    }
  };

  useEffect(() => {
    (async () => {
      await handleAcceptedRequest();
    })();
  }, [dispatch]);

  if (!connectiondata) return null;

  // Filter out any null values from the connectiondata array
  const filteredConnections = connectiondata.filter(user => user !== null);

  if (filteredConnections.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='min-h-screen flex flex-col justify-center items-center text-center bg-gray-50 p-4'
      >
        <div className="max-w-md mx-auto">
          <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-4'>No Connections Found</h1>
          <p className='text-gray-600 mb-6'>
            You'll see connections here when someone accepts your request. Start connecting with others now!
          </p>
          <Link to="/feed">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center justify-center mx-auto'
            >
              <FiHome className="mr-2" />
              Go to Home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto pt-9">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Your Connections</h1>
          <p className="mt-2 text-gray-600">
            {filteredConnections.length} {filteredConnections.length === 1 ? 'connection' : 'connections'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnections.map((user, index) => {
            const {_id, firstName, lastName, age, gender, skills, photoUrl, about } = user;
            return (
              <motion.div
                key={_id || index}  // Use _id if available, otherwise fall back to index
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="flex flex-col sm:flex-row sm:items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200"
              >
                <div className="flex-shrink-0 p-4">
                  <img
                    className="w-20 h-20 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-gray-200 object-cover"
                    src={photoUrl || "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"}
                    alt={`${firstName} ${lastName}`}
                  />
                </div>
                
                <div className="p-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {firstName} {lastName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {age} years • {gender}
                  </p>
                  {about && (
                    <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                      {about}
                    </p>
                  )}
                  {skills && (
                    <div className="mt-2">
                      <span className="text-xs font-medium text-gray-500">Skills:</span>
                      <p className="text-sm text-gray-700 line-clamp-1">
                        {Array.isArray(skills) ? skills.join(', ') : skills}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex justify-center sm:block">
                  <Link 
                    to={`/chat/${_id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300 text-sm"
                  >
                    <FiMessageSquare className="mr-2" />
                    <span className="hidden sm:inline">Chat</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Connection;