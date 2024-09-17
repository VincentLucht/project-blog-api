import { API_URL } from '../../../../../App';

export async function addComment(token: string, blogId: string, text: string) {
  const response = await fetch(`${API_URL}/blogs/${blogId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) throw new Error();
}
