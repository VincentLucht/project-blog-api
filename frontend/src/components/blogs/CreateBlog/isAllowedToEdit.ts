import { API_URL } from '../../../App';

interface Response {
  isAllowed: boolean;
}

export async function isAllowedToEdit(userId: string, blogId: string, token: string) {
  const response = await fetch(`${API_URL}/blogs/${userId}/${blogId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as Response;
  return result.isAllowed;
}
