import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutAsync, selectUser } from '../../Features/Auth/authSlice';

import './Nav.scoped.css';

import DropDownProfile from '../../Features/Profile/Components/DropDownProfile/DropDownProfile';

import {ReactComponent as Menu} from '../../assets/icons/menu.svg';
import {ReactComponent as Logo} from '../../assets/icons/sports_gymnastics.svg';
import {ReactComponent as  Profile} from '../../assets/icons/person.svg';
import {ReactComponent as Dashboard} from '../../assets/icons/dashboard.svg';
import {ReactComponent as Day} from '../../assets/icons/motion_photos_on.svg';
import {ReactComponent as Food} from '../../assets/icons/restaurant.svg';
import {ReactComponent as Exercise} from '../../assets/icons/exercise.svg';
import {ReactComponent as User} from '../../assets/icons/account_circle.svg';

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [user, navigate]);

  const handleSignOut = () => {
    dispatch(signOutAsync());
  }

  return (
    <>
      <div className='top'>
        <button className='menue-switch' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu />
        </button>
        <div className='logo'>
          <Logo />
        </div>
      </div>
      <nav className={`bar ${isMenuOpen ? 'open' : ''}`}>
        <div className='middle'>
          <DropDownProfile closeMenu={() => setIsMenuOpen(!isMenuOpen)} />
          <NavLink to="/" className='nav-element' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Dashboard />
            Dashboard
          </NavLink>
          <NavLink to="/day" className='nav-element' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Day />
            Tag
          </NavLink>
          <NavLink to="/foods" className='nav-element' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Food />
            Essen
          </NavLink>
          <NavLink to="/exercise" className='nav-element' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Exercise />
            Übungen
          </NavLink>
        </div>

        <div className='bottom'>
          <button className="nav-element" type='button' onClick={handleSignOut}>
            <User />
            Ausloggen
          </button>
        </div>
      </nav>
    </>
  );
}

export default Nav;
