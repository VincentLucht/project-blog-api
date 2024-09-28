import { API_URL } from '../../../App';
import { User } from '../Blog';
import { BlogTags } from '../BlogDetail/BlogDetail';

export interface BlogItem {
  id: string;
  title: string;
  is_published: string;
  summary: string;
  content: string;
  posted_on: Date;
  updated_at: Date | string;
  tags: BlogTags[];
  users: User[];
}

export interface BlogResponse {
  data: BlogItem[];
}

export async function fetchBlogs(): Promise<BlogResponse> {
  const response = await fetch(`${API_URL}/blogs`);
  if (!response.ok) throw new Error(`Http error! status: ${response.status}`);
  return response.json() as Promise<BlogResponse>;
}
