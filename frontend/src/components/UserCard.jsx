import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedslice";
import { motion } from "framer-motion"; // Import Framer Motion
import { Base_url } from "../utils/helper";
const UserCard = ({ _id, firstName, gender, lastName, skills, age, about, photoUrl }) => {
  const dispatch = useDispatch();

  // Handle sending request (interested or ignored)
  const handlesendrequest = async (status, toUserId) => {
    if (!toUserId) {
      console.error("to user id is required");
      return;
    }

    try {
      const res = await axios.post(
        `${Base_url}/req/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(toUserId)); // Remove the card from the feed
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  // Animation variants for the card
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" },
  };

  return (
    <motion.div
      className="card bg-purple-200 shadow-xl rounded-lg overflow-hidden transform transition-all duration-300"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* User Image */}
      <figure className="px-6 pt-6">
        <motion.img
          src={photoUrl || " https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"} // Fallback for missing image
          alt="User Profile"
          className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </figure>

      {/* User Details */}
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl font-bold text-gray-800">
          {firstName} {lastName}
        </h2>
        <div className="text-gray-600 space-y-2">
          <p>
            <span className="font-semibold">Age:</span> {age}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {gender}
          </p>
          <p>
            <span className="font-semibold">Skills:</span> {skills}
          </p>
          <p className="max-w-xs">
            <span className="font-semibold">About:</span> {about}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="card-actions mt-6 gap-4">
          <motion.button
            className="btn btn-secondary px-6"
            onClick={() => handlesendrequest("ignored", _id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Ignore
          </motion.button>
          <motion.button
            className="btn btn-primary px-6"
            onClick={() => handlesendrequest("interested", _id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Interested
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;