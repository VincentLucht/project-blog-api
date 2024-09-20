import { useLocation } from 'react-router-dom';
import { useAuthContext } from '../auth/useAuthContext';
import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/', label: 'Blogs', authRequired: false },
  { path: '/hub', label: 'Create', authRequired: true },
  { path: '/account', label: 'Account', authRequired: true },
];

function Header() {
  const { isLoggedIn } = useAuthContext();
  const location = useLocation();

  const isActive = (path: string) => {
    // check if the path is a blog id or another route
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 transition-all
        duration-200 sm:py-4"
    >
      <div className="text-2xl font-black sm:text-3xl">Odin&apos;s Code Forge</div>
      <nav className="gap-4 df">
        {NAV_ITEMS.map(({ path, label, authRequired }) => {
          if (authRequired && !isLoggedIn) return null;

          return (
            <Link
              key={path}
              to={path}
              className={`nav-button ${isActive(path) ? 'active' : ''}`}
            >
              {label}
            </Link>
          );
        })}
        {!isLoggedIn && (
          <Link
            to="/login"
            className={`nav-button
            ${location.pathname === '/login' || location.pathname === '/sign-up' ? 'active' : ''}`}
          >
            Sign In
          </Link>
        )}
      </nav>
    </div>
  );
}

export default Header;
