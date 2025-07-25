import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userslice";
import { toast } from "react-toastify";
import axios from "axios";
import Profilecard from "./Profilecard";
import { motion } from "framer-motion"; 
import { Base_url } from "../utils/helper";

const EditProfile = ({ firstName, lastName, about, age, gender, photoUrl, skills }) => {
  const [fName, setFName] = useState(firstName || "");
  const [lName, setLName] = useState(lastName || "");
  const [aboutMe, setAboutMe] = useState(about || "");
  const [ageVal, setAgeVal] = useState(age || "");
  const [photo, setPhoto] = useState(photoUrl || "");
  const [genderval, setGender] = useState(gender || "");
  const [loading, setLoading] = useState(false); // ✅ Loading state for button

  const dispatch = useDispatch();

  // Handle save function
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.patch(
        Base_url+"/profile/edit",
        { firstName: fName, lastName: lName, about: aboutMe, age: ageVal, photoUrl: photo, gender: genderval },
        { withCredentials: true }
      );
      dispatch(addUser(response.data.data));
      toast.success("Profile Updated Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  // Motion Variants for Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-12">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto p-6" 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left: Form */}
        <motion.form
          className="bg-white p-8 shadow-lg rounded-xl border border-gray-200"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Edit Profile</h2>

          {/* Profile Image Preview */}
          <motion.div
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <img
              className="w-32 h-32 object-cover rounded-full border-4 border-gray-300"
              src={photo || "    https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"}
              alt="Profile Preview"
            />
          </motion.div>

          {/* First Name */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">First Name</label>
            <input
              type="text"
              className="w-full text-black p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              className="w-full p-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Age</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={ageVal}
              onChange={(e) => setAgeVal(e.target.value)}
            />
          </div>


          <div className="mb-4">
            <label className="block font-medium text-gray-700">Photo Url</label>
            <input
              type="text"
              className="w-full text-black p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Gender</label>
            <select
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={genderval}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* About */}
          <div className="mb-6">
            <label className="block font-medium text-gray-700">About</label>
            <textarea
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Write something about yourself..."
              rows="4"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
            />
          </div>

          {/* Save Button */}
          <motion.button
            type="submit"
            onClick={handleSaveChanges}
            className="w-full py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </motion.button>
        </motion.form>

        {/* Right: Profile Preview */}
        <motion.div className="flex justify-center" variants={itemVariants}>
          <Profilecard
            firstName={fName}
            lastName={lName}
            age={ageVal}
            photoUrl={photo}
            about={aboutMe}
            gender={genderval}
            skills={skills}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EditProfile;
