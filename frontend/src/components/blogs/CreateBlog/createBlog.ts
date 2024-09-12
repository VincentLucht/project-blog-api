import { API_URL } from '../../../App';
import { User } from '../../account/useGetToken';
import { BlogItem } from '../fetchBlogs';

interface ResponseData {
  message: string;
  user: User;
  blog: BlogItem;
}

export async function createBlog(token: string) {
  const response = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!response.ok) throw new Error();

  return (await response.json()) as ResponseData;
}
