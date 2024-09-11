import { useEffect, useState } from 'react';
import { fetchSingularBlog } from './fetchSingularBlog';
import { useParams } from 'react-router-dom';
import ContentRenderer from './ContentRenderer';
import NotFound from '../../partials/NotFound';

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

export type ContentTypes =
  | 'large header'
  | 'header'
  | 'small header'
  | 'text'
  | 'image'
  | 'line break'
  | 'code block';

export interface Content {
  blogId: string;
  content: string;
  id: string;
  order: number;
  type: ContentTypes;
}

export interface CompleteBlogItem {
  id: string;
  is_published?: boolean;
  posted_on?: string;
  summary: string;
  title: string;
  updated_at?: string;
  comments?: Comment[];
  content: Content[];
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
          console.log(fetchedBlog.data); // ! TODO remove this
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
  if (!blog) return <NotFound />;

  return (
    <div>
      <h1 className="mb-4 text-left text-5xl font-extrabold underline">{blog.title}</h1>
      <ContentRenderer content={blog.content} />
    </div>
  );
}
