import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

// Define the type for context
export interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  login: (newToken: string) => void;
  logout: () => void;
}

export const LoginContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  // check if the token exists and set state
  const storedToken = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [token, setToken] = useState(storedToken);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const login = useCallback((newToken: string) => {
    setToken(newToken);
    setIsLoggedIn(true);
    localStorage.setItem('token', newToken);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    toast.success('Successfully logged out');
    navigate('/');
  }, [navigate]);

  // ? log the user out if the token is expired
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp) {
      if (currentTime > decodedToken.exp) {
        toast.warn('Due to not logging in for some time, you were logged out.');
        logout();
      }
    }
  }

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, token, setToken, login, logout }}
    >
      {children}
    </LoginContext.Provider>
  );
}
