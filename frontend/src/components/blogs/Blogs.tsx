import { useState, useEffect } from 'react';
import { fetchBlogs, BlogItem } from './fetchBlogs';
import { searchBlogs } from './searchBlogs';
import { Blog } from './Blog';
import ConnectionError from '../partials/ConnectionError';

function Blogs() {
  const [search, setSearch] = useState('');
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

  const searchBlog = () => {
    if (search === '') {
      // If search is empty, reset to original data
      setData(originalData);
      return;
    }

    searchBlogs(search)
      .then((response) => {
        setData(response.foundBlogs);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchBlog();
  };

  if (loading) return <div>Loading...</div>;
  if (error === 'Load failed') return <ConnectionError />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <form className="relative mb-4" onSubmit={onSubmit}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-3xl px-4 py-3 shadow-md transition-shadow hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="text"
          placeholder="Search Blog"
          aria-label="Search Blog"
        />
        <button
          className="absolute right-0 top-0 h-full transform rounded-r-3xl bg-blue-600 px-4 font-bold
            text-white transition-all duration-300 ease-in-out hover:bg-blue-700 active:scale-95
            active:bg-blue-800"
          type="submit"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 gap-16 pb-8 pt-4 lg:grid-cols-2">
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
    </>
  );
}

export default Blogs;
