import { API_URL } from '../../../App';
import { BlogItem } from './fetchBlogs';

interface ResponseData {
  foundBlogs: BlogItem[];
}

export async function searchBlogs(title: string) {
  const response = await fetch(`${API_URL}/blogs/${title}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response) {
    throw new Error('There was an error while searching the blogs, please try again');
  }

  return (await response.json()) as ResponseData;
}
