import { useEffect, useState } from 'react';
import { useAuthContext } from '../../auth/useAuthContext';
import { useGetUser } from '../../account/useGetToken';
import { useGetToken } from '../../account/useGetToken';

import CreateBlogButton from './CreateBlogButton';
import { Blog, BlogInterface } from '../Blog';
import fetchUserBlogs from './fetchUserBlogs';

import NotLoggedIn from '../../partials/NotLoggedIn';
import ConnectionError from '../../partials/ConnectionError';

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
  const [isConnectionError, setConnectionError] = useState<boolean>(false);
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
          setLoading(false);
          if (e instanceof Error) {
            if (e.message === 'Load failed') setConnectionError(true);
            else setError(e.message);
          } else {
            setError('An error occurred');
          }
        });
    }
  }, [user?.id, token, logout]);

  if (!user) return <NotLoggedIn />;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (isConnectionError) return <ConnectionError />;
  if (!userBlogs) return <div>No user data available.</div>;

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h2 className="text-left h2">These are your blogs:</h2>
        <div className="df">
          <CreateBlogButton />
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
