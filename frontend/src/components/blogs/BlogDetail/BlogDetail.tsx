import { useEffect, useState } from 'react';
import { fetchSingularBlog } from './fetchSingularBlog';
import { useParams } from 'react-router-dom';
import contentRenderer from './contentRenderer';

interface User {
  id: string;
  name: string;
}

interface Comment {
  blogId: string;
  id: string;
  parent_comment_id: string;
  posted_on: string;
  replies: Comment[];
  text: string;
  user: User;
  userId: string;
}

export type ContentTypes = 'text' | 'image' | 'header';

export interface Content {
  blogId: string;
  content: string;
  id: string;
  order: number;
  type: ContentTypes;
}

export interface CompleteBlogItem {
  comments: Comment[];
  content: Content[];
  id: string;
  is_published?: true;
  posted_on?: string;
  summary: string;
  title: string;
  updated_at?: string;
}

export function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<CompleteBlogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function loadBlog() {
      fetchSingularBlog(id)
        .then((fetchedBlog) => {
          setBlog(fetchedBlog.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(`Failed to load blog: ${error}`);
          setLoading(false);
        });
    }

    loadBlog();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>No blog found</div>;

  const content = contentRenderer(blog.content);
  console.log(content);

  return <div>{content}</div>;
}
