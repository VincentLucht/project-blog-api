import { useAuthContext } from '../auth/useAuthContext';
import { jwtDecode } from 'jwt-decode'; // Make sure to import jwtDecode

export interface User {
  id: string;
  name: string;
  role: 'BASIC' | 'AUTHOR';
}

export function useGetUser() {
  const { token } = useAuthContext();
  if (!token) return null;
  return jwtDecode<User>(token);
}

export function useGetToken() {
  const { token } = useAuthContext();
  if (!token) return null;
  return token;
}
