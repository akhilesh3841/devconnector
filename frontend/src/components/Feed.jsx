import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedslice";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import UserCard from "./UserCard";
import { Base_url } from "../utils/helper";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed.feed);

  // Fetch feed data
  const getfeed = async () => {
    try {
      const res = await axios.get(Base_url+"/userdata/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    getfeed();
  }, []);

  // Animation variants for UserCard
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Your Feed
      </h1>

      {feed && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }} // Stagger animations for each card
        >
          <AnimatePresence>
            {feed.map((user, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                exit="hidden"
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <UserCard {...user} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default Feed;