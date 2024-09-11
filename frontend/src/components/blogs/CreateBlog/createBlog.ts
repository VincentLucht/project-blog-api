import { API_URL } from '../../../App';

export async function createBlog(token: string) {
  const response = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!response.ok) throw new Error();
}
