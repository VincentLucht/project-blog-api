import { API_URL } from '../../../App';
import { User } from '../../account/useGetToken';
import { BlogItem } from '../fetchBlogs';

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
    // Server returned an error status code (4xx or 5xx)
    let errorData: ErrorResponse | undefined;
    try {
      // Attempt to parse the error response as JSON
      errorData = (await response.json()) as ErrorResponse;
    } catch (err) {
      // If parsing fails, throw a generic error
      throw new Error('Failed to create blog');
    }

    // Throw an error with the server-provided message
    console.log(errorData);
    throw new Error(errorData?.message ?? 'Failed to create blog');
  }

  return (await response.json()) as ResponseData;
}
