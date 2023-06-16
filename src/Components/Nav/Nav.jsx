import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutAsync } from '../../Features/Auth/authSlice';
import './Nav.scoped.css'

function Nav() {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signOutAsync());
    window.location.href = '/sign-in';
  }

  return (
    <div className='sidebar'>
      <ul>
        <div>
          <button>Profil wählen</button>
        </div>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/exercise">Tag</Link>
        </li>
        <li>
          <Link to="/foods">Essen</Link>
        </li>
        <li>
          <Link to="/exercise">Übungen</Link>
        </li>
        <li>
          <Link to="/sign-up">Registrieren</Link>
        </li>
        <li>
          <Link to="/sign-in">Einloggen</Link>
        </li>
        <li>
          <button type='button' onClick={handleSignOut}>Ausloggen</button>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
