import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { addUser } from '../utils/userslice';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Base_url } from '../utils/helper';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstname, setname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [umar, setumar] = useState('');
    const [gend, setgend] = useState('');
    const [photo, setPhoto] = useState('');
    const [about, setAbout] = useState('');
    const [skills, setSkills] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            firstName: firstname,
            lastName: lastname,
            emailId: email,
            password: pass,
            age: umar,
            gender: gend,
            photoUrl: photo,
            about,
            skills
        };

        try {
            const response = await axios.post(Base_url+"/api/register", userData, {
                withCredentials: true,
            });

            console.log(response.data.data);
            dispatch(addUser(response?.data?.data));
            toast.success("User added successfully");
            navigate('/profile');
        } catch (error) {
            console.error(error);
            const errordata = error.response?.data;
            toast.error(errordata?.message || "Registration failed");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="hero bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen flex items-center justify-center"
        >
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card bg-white w-full max-w-lg p-8 shadow-2xl rounded-lg border border-gray-100"
            >
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Sign Up</h1>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label font-semibold text-gray-700">First Name</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                                value={firstname}
                                onChange={(e) => setname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold text-gray-700">Last Name</label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                                value={lastname}
                                onChange={(e) => setlastname(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                            value={pass}
                            onChange={(e) => setpass(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label font-semibold text-gray-700">Age</label>
                            <input
                                type="number"
                                placeholder="18"
                                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                                value={umar}
                                onChange={(e) => setumar(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold text-gray-700">Gender</label>
                            <select
                                className="select select-bordered w-full focus:ring-2 focus:ring-blue-500"
                                value={gend}
                                onChange={(e) => setgend(e.target.value)}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
{/* 
                    <div className="form-control">
                        <label className="label font-semibold text-gray-700">Photo URL</label>
                        <input
                            type="url"
                            placeholder="Enter Photo URL"
                            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            required
                        />
                    </div> */}

                    {/* <div className="form-control">
                        <label className="label font-semibold text-gray-700">About</label>
                        <textarea
                            placeholder="Tell us about yourself"
                            className="textarea textarea-bordered w-full h-24 focus:ring-2 focus:ring-blue-500"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            required
                        />
                    </div> */}

                    <div className="form-control">
                        <label className="label font-semibold text-gray-700">Skills</label>
                        <input
                            type="text"
                            placeholder="Enter your skills (comma separated)"
                            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-control mt-8">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Sign Up
                        </motion.button>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default Signup;