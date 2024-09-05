import { API_URL } from '../../../App';
import { CompleteBlogItem } from './BlogDetail';

export interface BlogResponseSingular {
  data: CompleteBlogItem;
}

export async function fetchSingularBlog(
  id: string | undefined,
): Promise<BlogResponseSingular> {
  if (!id) throw new Error('Blog was not found');

  const response = await fetch(`${API_URL}/blogs/${id}`);
  if (!response.ok) throw new Error('Blog was not found');
  return response.json() as Promise<BlogResponseSingular>;
}
