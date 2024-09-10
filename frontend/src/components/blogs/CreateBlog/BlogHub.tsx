import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetUser } from '../../account/useGetToken';
import { useGetToken } from '../../account/useGetToken';
import { Blog, BlogInterface } from '../Blog';
import NotLoggedIn from '../../partials/NotLoggedIn';
import fetchUserBlogs from './fetchUserBlogs';

export interface AllUserBlogs {
  id: string;
  blog_id: string;
  use_id: string;
  blog: BlogInterface;
}

function BlogHub() {
  const [userBlogs, setUserBlogs] = useState<AllUserBlogs[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = useGetToken();
  const user = useGetUser();

  useEffect(() => {
    if (user?.id && token) {
      setLoading(true);
      fetchUserBlogs(user.id, token)
        .then((result) => {
          setUserBlogs(result.data.blogs);
          setLoading(false);
        })
        .catch((e) => {
          setError(e instanceof Error ? e.message : 'An error occurred');
          setLoading(false);
        });
    }
  }, [user?.id, token]);

  if (!user) return <NotLoggedIn />;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userBlogs) return <div>No user data available.</div>;
  if (userBlogs.length === 0) return <div>No posts here...</div>;

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h2 className="text-left h2">These are your blogs:</h2>
        <div className="df">
          <Link to="/hub">Create new (doesnt work)</Link>
        </div>
      </div>

      <div className="grid gap-8">
        {userBlogs.map((blog, index) => (
          <Blog
            key={index}
            id={blog.blog.id}
            title={blog.blog.title}
            posted_on={blog.blog.posted_on}
            summary={blog.blog.summary}
            readMore={false}
            editMode={true}
          />
        ))}
      </div>
    </div>
  );
}

export default BlogHub;
