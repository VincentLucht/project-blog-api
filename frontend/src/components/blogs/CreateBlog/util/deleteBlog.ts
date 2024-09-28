import { API_URL } from '../../../../App';

import { User } from '../../../account/useGetToken';
import { jwtDecode } from 'jwt-decode';

export async function deleteBlog(blogId: string, token: string) {
  const user: User = jwtDecode(token);

  if (!user?.id) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${API_URL}/blogs/${blogId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!response.ok) throw new Error();
}
