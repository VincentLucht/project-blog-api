import { API_URL } from '../../../../App';
import { User } from '../../../account/useGetToken';
import { BlogItem } from '../../util/fetchBlogs';

interface ResponseData {
  message: string;
  user: User;
  blog: BlogItem;
}

interface ErrorResponse {
  message: string;
}

export async function createBlog(token: string) {
  const response = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!response.ok) {
    let errorData: ErrorResponse | undefined;
    try {
      errorData = (await response.json()) as ErrorResponse;
    } catch (err) {
      throw new Error('Failed to create blog');
    }

    throw new Error(errorData?.message ?? 'Failed to create blog');
  }

  return (await response.json()) as ResponseData;
}
