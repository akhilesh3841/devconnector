import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userslice';
import EditProfile from './EditProfile';
import Profilecard from './Profilecard';


const Profile = () => {
  const user=useSelector((store)=>store.user.user);
  console.log(user)

  return (
    user && (
      <div className=' bg-white'>
        <EditProfile {...user} />
      </div>
    )
  )
}

export default Profile
