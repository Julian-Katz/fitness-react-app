import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProfileAsync, selectProfiles, selectError } from '../profileSlice';
import AddProfile from './AddProfile';
import ProfileCard from './ProfileCard';

function Profile() {
  const dispatch = useDispatch();

  const profiles = useSelector(selectProfiles);



  return (
    <div className='content-area'>
      <AddProfile />
      {profiles.map((profile) => (
        <ProfileCard key={profile._id} profile={profile} />
      ))}

    </div>
  );
}


export default Profile;
