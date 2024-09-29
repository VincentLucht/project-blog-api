import { useState, useEffect } from 'react';
import { searchBlogs } from './util/searchBlogs';
import { toast } from 'react-toastify';
import { BlogItem } from './util/fetchBlogs';
import { BlogData } from './CreateBlog/BlogHub';

interface SearchBarProps {
  mode?: 'normal' | 'user';
  setBlogs?: React.Dispatch<React.SetStateAction<BlogItem[]>>;
  originalBlogs?: BlogItem[];
  setUserBlogs?: React.Dispatch<React.SetStateAction<BlogData[]>>;
  originalUserBlogs?: BlogData[];
}

function SearchBar({
  mode = 'normal',
  setBlogs,
  originalBlogs,
  setUserBlogs,
  originalUserBlogs,
}: SearchBarProps) {
  const [search, setSearch] = useState('');
  const [lastSearchTerm, setLastSearchTerm] = useState('');

  useEffect(() => {
    const searchBlog = () => {
      if (mode === 'normal' && setBlogs && originalBlogs) {
        if (search === '') {
          // Only reset if the search term has actually changed to empty
          if (lastSearchTerm !== '') {
            setBlogs(originalBlogs);
            setLastSearchTerm('');
          }
          return;
        }

        searchBlogs(search)
          .then((response) => {
            setBlogs(response.foundBlogs);
            setLastSearchTerm(search);
          })
          .catch((e: { message: string | undefined }) => {
            toast.error(`${e.message}`);
          });
      } else {
        //  User searches own blogs
        if (!setUserBlogs || !originalUserBlogs) {
          return;
        }

        if (search === '') {
          setUserBlogs(originalUserBlogs);
          return;
        }
        const filteredBlogs = originalUserBlogs.filter((userBlog) =>
          userBlog.title.toLowerCase().includes(search.toLowerCase()),
        );
        setUserBlogs(filteredBlogs);
      }
    };

    //  Debounce the search to avoid too many API calls
    const debounceTimer = setTimeout(() => {
      searchBlog();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [
    search,
    lastSearchTerm,
    mode,
    setBlogs,
    originalBlogs,
    setUserBlogs,
    originalUserBlogs,
  ]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ? Search is triggered automatically by useEffect hook
  };

  return (
    <form className="relative flex-1" onSubmit={onSubmit}>
      <div>
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
      </div>
    </form>
  );
}

export default SearchBar;
