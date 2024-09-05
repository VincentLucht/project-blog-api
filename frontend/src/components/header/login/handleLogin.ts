import { API_URL } from '../../../App';

interface LoginResponse {
  success: boolean;
  token: string;
}

export const handleLogin = async (
  name: string,
  password: string,
): Promise<LoginResponse> => {
  // send request
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password }),
  });

  // check for errors, return express-validator errors
  if (!response.ok) {
    const errorObject = (await response.json()) as LoginResponse;
    throw errorObject;
  }

  const data = (await response.json()) as LoginResponse;
  return data; // ? return token
};
