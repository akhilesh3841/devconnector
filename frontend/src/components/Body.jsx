import React from "react";
import { useSelector } from "react-redux";
import Feed from "./Feed";
import Watchpage from "./Watchpage";
import { motion } from "framer-motion"; // For animations

const Body = () => {
  const userdata = useSelector((store) => store.user.user);

  return (
    <div className="min-h-screen bg-gradient-to-b">
      {/* Navbar is already included in your app, so no need to add it here */}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Animate to this state
        transition={{ duration: 0.5 }} // Animation duration
        className="container mx-auto px-4 py-8"
      >
        {/* Conditional Rendering Based on User Authentication */}
        {userdata ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Feed />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Watchpage />
          </motion.div>
        )}
      </motion.div>

      {/* Footer is already included in your app, so no need to add it here */}
    </div>
  );
};

export default Body;