import { API_URL } from '../../../../App';
import { CompleteBlogItem } from '../../BlogDetail/BlogDetail';
import { toast } from 'react-toastify';
import { ValidationError } from '../../../header/login/Login';

import { User } from '../../../account/useGetToken';
import { jwtDecode } from 'jwt-decode';

interface ErrorResponse {
  errors: ValidationError[];
  error?: string;
}

export async function updateBlog(updatedBlogItem: CompleteBlogItem, token: string) {
  const { id, title, summary, is_published, tags, updated_at, content } =
    updatedBlogItem;
  const user: User = jwtDecode(token);

  if (!user?.id) {
    throw new Error('User not authenticated');
  }

  if (content.length === 0) {
    toast.error('Do you really want to publish an empty Blog?', { autoClose: 10000 });
    throw new Error();
  }

  const response = await fetch(`${API_URL}/blogs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      title,
      summary,
      is_published,
      tags,
      updated_at,
      content: JSON.stringify(content), // ? stringify array again
    }),
  });

  if (!response.ok) {
    const errorData = (await response.json()) as ErrorResponse;

    if (errorData.errors) {
      // express-validator errors
      errorData.errors.map((error: ValidationError) => {
        toast.error(error.msg, { autoClose: 10000 });
      });
      throw new Error('There was an error while updating the Blog');
    } else if (errorData.error && errorData.error === 'Forbidden') {
      const errorMessage = 'This is not your blog, please go away!';
      toast.error(errorMessage, { autoClose: 10000 });
      throw new Error(errorMessage);
    } else {
      // fallback
      const errorMessage = 'An unknown error occurred while updating the blog.';
      toast.error(errorMessage, { autoClose: 10000 });
      throw new Error(errorMessage);
    }
  }
}
