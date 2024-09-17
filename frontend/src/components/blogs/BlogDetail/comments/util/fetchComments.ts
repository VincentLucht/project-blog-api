import { API_URL } from '../../../../../App';
import { Comment } from '../../BlogDetail';

export interface ResponseDataFetchComments {
  blogComments: Comment[];
}

export async function fetchComments(
  blogId: string,
): Promise<ResponseDataFetchComments> {
  const response: Response = await fetch(`${API_URL}/blogs/${blogId}/comments`);
  if (!response.ok) throw new Error('Blog was not found');
  return (await response.json()) as ResponseDataFetchComments;
}
