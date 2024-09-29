import { useState, useEffect } from 'react';
import { fetchBlogs, BlogItem } from './util/fetchBlogs';

import { Blog } from './Blog';
import SearchBar from './SearchBar';
import { SortOptions } from './SortOptions';
import FilterOptions from './FilterOptions';

import ConnectionError from '../partials/ConnectionError';
import Loading from '../partials/Loading';
import NoMessageFound from '../partials/noMessageFound';

function Blogs() {
  const [data, setData] = useState<BlogItem[]>([]);
  const [originalData, setOriginalData] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs()
      .then((result) => {
        setData(result.data);
        setOriginalData(result.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'An error occurred');
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  if (error === 'Load failed') return <ConnectionError />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="mb-4 gap-5 df">
        <SearchBar setBlogs={setData} originalBlogs={originalData} />

        <SortOptions blogs={data} setBlogs={setData} />
      </div>

      <FilterOptions setBlogs={setData} originalData={originalData} />

      <div
        className={`${data && data.length !== 0 ? 'grid auto-rows-auto grid-cols-1 items-start gap-16 lg:grid-cols-2' : ''}
          pb-8 pt-4`}
      >
        {data.length === 0 && (
          <NoMessageFound
            message="No Blogs found here..."
            secondMessage="Are you sure you typed the correct name?"
          />
        )}

        {data.map((blog) => (
          <Blog
            key={blog.id}
            id={blog.id}
            title={blog.title}
            summary={blog.summary}
            posted_on={blog.posted_on}
            tags={blog.tags}
            users={blog.users}
          />
        ))}
      </div>
    </>
  );
}

export default Blogs;
