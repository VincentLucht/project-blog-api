import { useContext } from 'react';
import { LoginContext, AuthContextType } from './AuthContextProvider';

export function useAuthContext(): AuthContextType {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
}
