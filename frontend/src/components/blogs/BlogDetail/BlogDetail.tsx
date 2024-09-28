import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ContentRenderer from './ContentRenderer';
import Comments from './comments/CommentSection';
import NotFound from '../../partials/NotFound';
import Loading from '../../partials/Loading';

import { fetchSingularBlog } from './fetchSingularBlog';

interface User {
  id: string;
  name: string;
}

enum BlogTags {
  JavaScript = 'JavaScript',
  TypeScript = 'TypeScript',
  React = 'React',
  NodeJS = 'NodeJS',
  HTML = 'HTML',
  CSS = 'CSS',
  WebDevelopment = 'WebDevelopment',
  Frontend = 'Frontend',
  Backend = 'Backend',
  FullStack = 'FullStack',
}

export interface Comment {
  blogId: string;
  id: string;
  parent_comment_id: string;
  posted_on: string;
  repliedToName?: string;
  replies: Comment[];
  text: string;
  user: User;
  userId: string;
}

export interface Content {
  blogId: string;
  content: string;
  id: string;
  order: number;
}

export interface CompleteBlogItem {
  id: string;
  title: string;
  summary: string;
  is_published?: boolean;
  content: Content[];
  posted_on?: string;
  updated_at?: string;
  tags: BlogTags[];
  // comments?: Comment[]; // ? separated comments separate function
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
          setLoading(false);
          setBlog(fetchedBlog.data);
        })
        .catch((error) => {
          setError(`Failed to load blog: ${error}`);
          setLoading(false);
        });
    }

    loadBlog();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <NotFound />;

  return (
    <div>
      <h1 className="mb-4 text-left text-5xl font-extrabold underline">{blog.title}</h1>

      <ContentRenderer blocks={blog.content} />

      <Comments />
    </div>
  );
}

export { BlogTags };
