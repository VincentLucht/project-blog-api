import { useEffect, useState } from 'react';
import { useAuthContext } from '../../auth/useAuthContext';
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
  const { logout } = useAuthContext();

  const token = useGetToken();
  const user = useGetUser();

  useEffect(() => {
    if (user?.id && token) {
      setLoading(true);
      fetchUserBlogs(user.id, token)
        .then((result) => {
          if (!result.data) {
            logout();
          }
          setUserBlogs(result.data.blogs);
          setLoading(false);
        })
        .catch((e) => {
          setError(e instanceof Error ? e.message : 'An error occurred');
          setLoading(false);
        });
    }
  }, [user?.id, token, logout]);

  if (!user) return <NotLoggedIn />;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userBlogs) return <div>No user data available.</div>;

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h2 className="text-left h2">These are your blogs:</h2>
        <div className="df">
          <Link to="/hub">Create new (doesn&apos;t work)</Link>
        </div>
      </div>

      {userBlogs.length > 0 ? (
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
      ) : (
        <div className="flex-col df">
          <div className="mt-10 text-lg font-semibold">No blogs here...</div>
          <img
            className="w-96"
            src="./catNothingFound.gif"
            alt="gif of a cat poking a knitting ball"
          />
        </div>
      )}
    </div>
  );
}

export default BlogHub;
