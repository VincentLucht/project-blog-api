import { useState, useEffect } from 'react';
import { fetchBlogs, BlogItem } from './fetchBlogs';
import { Blog } from './Blog';
import ConnectionError from '../partials/ConnectionError';

function Blogs() {
  const [data, setData] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs()
      .then((result) => {
        setData(result.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'An error occurred');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error === 'Load failed') return <ConnectionError />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 gap-16 px-8 pb-8 pt-4 lg:grid-cols-2">
      {data.map((blog) => (
        <Blog
          key={blog.id}
          id={blog.id}
          title={blog.title}
          summary={blog.summary}
          posted_on={blog.posted_on}
        />
      ))}
    </div>
  );
}

export default Blogs;
