import { API_URL } from '../../../App';

export async function createBlog(token: string, userId: string) {
  const response = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
      body: JSON.stringify({ userId }),
    },
  });

  if (!response.ok) throw new Error();
}
