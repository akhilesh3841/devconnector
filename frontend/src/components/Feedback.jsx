import React, { useEffect, useState } from 'react';
import { UserData } from '../assets/UserData';
import { COMMENTS } from '../assets/COMMENTS';
import { motion } from 'framer-motion';

const Feedback = () => {
  const [index, setIndex] = useState(0);
  const [index1, setIndex1] = useState(0);
  const itemsToShow = 2; // Number of users and comments to show at once

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % (UserData.length - itemsToShow + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex1((prevIndex) => (prevIndex + 1) % (COMMENTS.length - itemsToShow + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-purple-100 grid lg:grid-cols-2 gap-6 px-4 md:px-8 py-10">
      {/* Show multiple users */}
      <div className="space-y-4">
        {UserData.slice(index, index + itemsToShow).map((user, i) => (
          <motion.div
            key={user.id || i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="p-6 rounded-xl shadow-md bg-white flex items-center gap-4 hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={user.photoUrl}
              alt="User"
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-gray-500 text-sm">
                Age: {user.age} | Gender: {user.gender}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Skills:</span> {user.skills.join(', ')}
              </p>
              <p className="text-gray-700 mt-2">{user.about}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show multiple comments */}
      <div className="space-y-4">
        {COMMENTS.slice(index1, index1 + itemsToShow).map((comment, i) => (
          <motion.div
            key={comment.id || i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="p-6 rounded-xl shadow-md bg-white border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300"
          >
            <h1 className="text-lg font-semibold text-gray-800">{comment.fullName}</h1>
            <p className="text-gray-600">{comment.comment}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;