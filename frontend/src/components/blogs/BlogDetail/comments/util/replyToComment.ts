import { API_URL } from '../../../../../App';

export async function replyToComment(
  blogId: string,
  text: string,
  parent_comment_id: string,
  replied_to_name: string,
  token: string,
) {
  const response = await fetch(`${API_URL}/blogs/${blogId}/comments/reply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ text, parent_comment_id, replied_to_name }),
  });

  if (!response.ok) throw new Error();
}
