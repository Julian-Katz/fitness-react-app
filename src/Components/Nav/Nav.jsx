import { Link } from 'react-router-dom';
import './Nav.scoped.css'

function Nav() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/food">Essen</Link>
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
      </ul>
    </div>
  );
}

export default Nav;