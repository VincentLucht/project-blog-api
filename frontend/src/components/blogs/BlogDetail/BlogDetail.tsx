import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Tags from '../Tags';
import ContentRenderer from './ContentRendererTest';
import Comments from './comments/CommentSection';
import NotFound from '../../partials/NotFound';
import Loading from '../../partials/Loading';

import { fetchSingularBlog } from './fetchSingularBlog';
import dayjs from 'dayjs';

interface User {
  name: string;
}

interface BlogUsers {
  user: User;
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
  users?: BlogUsers[];
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
      <h1 className="mb-4 text-left text-5xl font-extrabold">{blog.title}</h1>

      <div className="flex items-baseline gap-1">
        {blog.users?.map((user, index) => (
          <div className="text-base leading-none" key={index}>
            <span>{user.user.name}</span>
            {index !== (blog.users?.length ?? 0) - 1 && ','}
          </div>
        ))}
        <span className="flex items-center pl-1 text-sm leading-none text-gray-400">
          on {dayjs(blog?.updated_at).format('D MMM, YYYY')}
        </span>
      </div>

      {blog.tags.length === 0 ? (
        <div className="mb-5 mt-3"></div>
      ) : (
        <Tags tags={blog.tags} />
      )}

      <hr className="mb-10 h-[2.5px] border-none bg-blue-500" />

      <ContentRenderer blocks={blog.content} />

      <Comments />
    </div>
  );
}

export { BlogTags };
