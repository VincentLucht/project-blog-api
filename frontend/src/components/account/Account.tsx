import { useGetUser } from './useGetToken';
import { useAuthContext } from '../auth/useAuthContext';
import NotLoggedIn from '../partials/NotLoggedIn';

function Account() {
  const { logout } = useAuthContext();
  const user = useGetUser();
  if (!user) return <NotLoggedIn />;

  return (
    <div>
      <h2>Good day, {user.name}</h2>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default Account;
