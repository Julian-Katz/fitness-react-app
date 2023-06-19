import React, { useState, useEffect } from 'react';
import './DropDownProfile.scoped.css';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loadAsync, selectProfiles, selectActiveProfile } from '../../profileSlice';

import {ReactComponent as  Profile} from '../../../../assets/icons/person.svg';

function Foods() {
  const profiles = useSelector(selectProfiles);
  const activeProfile = useSelector(selectActiveProfile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAsync());
  }, [dispatch]);
  const [open, setOpen] = useState(false);

  const handleOptionClick = (profile) => {
      setOpen(false);
      dispatch({type: 'profile/setActiveProfile', payload: profile._id});
  };

  return (
    <div>
      <button type='button' className='nav-element' onClick={() => {setOpen(!open)}}>
          <Profile />
          {activeProfile?.name}
      </button>
      {open &&
        <div className='dropdown'>
          {profiles.map((profile) => (
            <button
              type='button'
              className='nav-element'
              onClick={() => {handleOptionClick(profile)}}
              key={profile._id}
            >
              {profile.name}
            </button>
          ))}
          <NavLink to="/profile" className='nav-element'>
            <Profile />
            Profil
          </NavLink>
        </div>
      }
    </div>
  );
}


export default Foods;
