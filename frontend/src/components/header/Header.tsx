import { Link } from 'react-router-dom';
import { useAuthContext } from '../auth/useAuthContext';

function Header() {
  const { isLoggedIn } = useAuthContext();

  return (
    <div className="mb-4 pt-6">
      <nav className="gap-4 df">
        <Link to="/" className="nav-button">
          Blogs
        </Link>

        {isLoggedIn ? (
          <>
            <Link to="/hub" className="nav-button">
              Create
            </Link>

            <Link to="/account" className="nav-button">
              Account
            </Link>
          </>
        ) : (
          <Link to="/login" className="nav-button">
            Sign In
          </Link>
        )}
      </nav>
    </div>
  );
}

export default Header;
