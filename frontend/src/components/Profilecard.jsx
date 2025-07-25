import React from 'react'

const Profilecard = ({ _id, firstName,gender, lastName, skills, age, about, photoUrl}) => {
  return (
    <div>
              <div className="card bg-base-300 w-full shadow-xl">
        <figure>
          <img
            className='rounded-lg w-52 mt-5'
            src={photoUrl||"https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"}  // ✅ Use default image

            alt="User Profile" />
        </figure>
        <div className="card-body">
          <h2 className='text-xl font-semibold'>{firstName} {lastName}</h2>
          <p className='m-0'>Age:{age}</p>
          <p className='m-0'>Gender: {gender}</p>
          <p className='m-0 w-72'>Skills: {skills}</p>
          <p className='m-0 w-72'>About: {about}</p>
          <div className="card-actions justify-center my-8 gap-6">
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profilecard