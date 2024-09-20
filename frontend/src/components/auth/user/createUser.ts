import { API_URL } from '../../../App';
import { ValidationError } from '../../header/login/Login';

export async function createUser(
  name: string,
  password: string,
  confirm_password: string,
  role: 'BASIC' | 'AUTHOR',
) {
  const response = await fetch(`${API_URL}/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password, confirm_password, role }),
  });

  if (!response.ok) {
    const errorObject = (await response.json()) as ValidationError;
    throw errorObject;
  }
}
