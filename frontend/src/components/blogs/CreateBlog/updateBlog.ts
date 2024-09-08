import { CompleteBlogItem } from '../BlogDetail/BlogDetail';
import { API_URL } from '../../../App';
import { toast } from 'react-toastify';
import { ValidationError } from '../../header/login/Login';

interface ErrorResponse {
  errors: ValidationError[];
}

export async function updateBlog(updatedBlogItem: CompleteBlogItem, token: string) {
  const { id, title, summary, is_published, updated_at, content } = updatedBlogItem;

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
    } else {
      // other error
      throw new Error('There was an error while updating the Blog');
    }
  }
}
