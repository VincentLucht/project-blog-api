import { useLocation } from 'react-router-dom';
import { useGetUser } from '../account/useGetToken';
import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/', label: 'Blogs', authRequired: false },
  { path: '/hub', label: 'Create', authRequired: true },
  { path: '/account', label: 'Account', authRequired: true },
];

function Header() {
  const user = useGetUser();
  const userRole = user?.role;
  const location = useLocation();

  const isActive = (path: string) => {
    const isBlogPostPath = (path: string) => {
      return (
        /^\/[a-zA-Z0-9-]+$/.test(path) && !NAV_ITEMS.some((item) => item.path === path)
      );
    };

    if (path === '/') {
      // Check if the path is the root path, but not '/login'
      return (
        location.pathname === '/' ||
        (isBlogPostPath(location.pathname) && location.pathname !== '/login')
      );
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
          if (authRequired && !user) return null;
          if (userRole === 'BASIC' && path === '/hub') {
            return null;
          }

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

        {!user && (
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
