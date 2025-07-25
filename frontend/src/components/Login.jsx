import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userslice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Base_url } from '../utils/helper';

const Login = () => {
    const [emailId, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    const loginhandler = async () => {
        try {
            const response = await axios.post(

                Base_url+'/login',
               {
                    emailId: emailId,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            );
            
            const userdata = response?.data;
            console.log('User data:', userdata);
            dispatch(addUser(userdata));
            toast.success('Login successful!');
            navigate('/');
        } catch (error) {
            console.error(error);
            if(error.status===404){
                toast.error('User not found. Please sign up first.');
            }
            else{
                toast.error('Invalid credentials.Check emailid and password.');
            }
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
                className="hero-content flex-col lg:flex-row-reverse gap-12"
            >
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-gray-800">Login now!</h1>
                
                
                    <p className="py-6 text-gray-600">
        Welcome back! Log in to explore a world of connections, opportunities, and endless possibilities. 
        After logging in, you'll enjoy personalized recommendations, seamless networking, and much more.
    </p>

                </div>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="card bg-white w-full max-w-sm shadow-2xl rounded-lg border border-gray-100"
                >
                    <div className="card-body p-8">
                        <fieldset className="space-y-6">
                            <div className="form-control">
                                <label className="label font-semibold text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Email"
                                    value={emailId}
                                    onChange={emailHandler}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold text-gray-700">Password</label>
                                <input
                                    type="password"
                                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                                    placeholder="Password"
                                    value={password}
                                    onChange={passwordHandler}
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={loginhandler}
                            >
                                Login
                            </motion.button>


                            <Link to="/forgotpassword">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="btn w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold"
  >
    Forgot Password?
  </motion.button>
</Link>



                        
                            <p className="text-center text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-blue-500 hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </fieldset>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Login;