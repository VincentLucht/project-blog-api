import { API_URL } from '../../../../App';
import { BlogData } from '../BlogHub';

export interface FetchUserBlogsResponse {
  allBlogs: BlogData[];
}

async function fetchUserBlogs(
  id: string,
  token: string,
): Promise<FetchUserBlogsResponse> {
  const response = await fetch(`${API_URL}/users/blogs/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  if (!response.ok) throw new Error(`Http error! status: ${response.status}`);
  return (await response.json()) as FetchUserBlogsResponse;
}

export default fetchUserBlogs;
