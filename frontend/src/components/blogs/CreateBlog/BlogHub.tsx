import { useEffect, useState } from 'react';
import { useAuthContext } from '../../auth/useAuthContext';
import { useGetUser } from '../../account/useGetToken';
import { useGetToken } from '../../account/useGetToken';

import CreateBlogButton from './CreateBlogButton';
import SearchBar from '../SearchBar';
import { SortOptions } from '../SortOptions';
import FilterOptions from '../FilterOptions';
import { Blog } from '../Blog';
import { BlogTags } from '../BlogDetail/BlogDetail';
import fetchUserBlogs, { FetchUserBlogsResponse } from './util/fetchUserBlogs';

import NotLoggedIn from '../../partials/NotLoggedIn';
import ConnectionError from '../../partials/ConnectionError';
import NoMessageFound from '../../partials/noMessageFound';
import Loading from '../../partials/Loading';

export interface BlogData {
  id: string;
  summary: string;
  tags: BlogTags[];
  title: string;
  updated_at: Date;
}

function BlogHub() {
  const [userBlogs, setUserBlogs] = useState<BlogData[]>([]);
  const [originalUserBlogs, setOriginalUserBlogs] = useState<BlogData[]>([]);
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
        .then((result: FetchUserBlogsResponse) => {
          if (!result) {
            logout();
          }
          setUserBlogs(result.allBlogs);
          setOriginalUserBlogs(result.allBlogs);
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
  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (isConnectionError) return <ConnectionError />;
  if (!userBlogs) return <NoMessageFound message="No user data available..." />;

  return (
    <>
      <div className="mb-4 flex justify-between">
        <h2 className="text-left h2">These are your blogs:</h2>
        <div className="df">
          <CreateBlogButton />
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-4 mt-8 gap-5 df">
          <SearchBar
            mode="user"
            setUserBlogs={setUserBlogs}
            originalUserBlogs={originalUserBlogs}
          />

          <SortOptions blogs={userBlogs} setBlogs={setUserBlogs} />
        </div>

        <FilterOptions originalData={originalUserBlogs} setBlogs={setUserBlogs} />
      </div>

      {userBlogs.length > 0 ? (
        <div className="grid gap-8">
          {userBlogs.map((blog, index) => (
            <Blog
              key={index}
              id={blog.id}
              title={blog.title}
              posted_on={blog.updated_at}
              summary={blog.summary}
              tags={blog.tags}
              readMore={false}
              editMode={true}
            />
          ))}
        </div>
      ) : (
        <NoMessageFound message="No Blogs found here..." />
      )}
    </>
  );
}

export default BlogHub;
