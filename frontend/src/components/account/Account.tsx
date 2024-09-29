import { useGetUser } from './useGetToken';
import { useAuthContext } from '../auth/useAuthContext';
import NotLoggedIn from '../partials/NotLoggedIn';

function Account() {
  const { logout } = useAuthContext();
  const user = useGetUser();
  if (!user) return <NotLoggedIn />;

  return (
    <div>
      <h2 className="h2">
        Good day, <span className="ml-1">{user.name}</span>
      </h2>

      <button className="mt-8 h-8 w-28 prm-button-red" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}

export default Account;
