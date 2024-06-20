import React from 'react'
import { useSelector } from 'react-redux'

const ProfileDropDown = () => {
    const {user}=useSelector((state)=>state.profile);

    console.log('user'.user);

  return (
    <div className='profile-user-name'>
        Hello {user?.username}
    </div>
  )
}

export default ProfileDropDown