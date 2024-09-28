import { sortByAlphabet, sortByTime } from './util/blogUtils';
import { BlogItem } from './util/fetchBlogs';
import { toast } from 'react-toastify';

const sortOptions = ['A-Z', 'Z-A', 'new', 'old'];

interface SortOptionsInterface {
  blogs: BlogItem[];
  setBlogs: (newBlogs: BlogItem[]) => void;
}

export function SortOptions({ blogs, setBlogs }: SortOptionsInterface) {
  const onSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (sortOptions.includes(e.target.value)) {
      switch (e.target.value) {
        case 'A-Z':
          setBlogs(sortByAlphabet(blogs, 'asc'));
          break;
        case 'Z-A':
          setBlogs(sortByAlphabet(blogs, 'desc'));
          break;
        case 'new':
          setBlogs(sortByTime(blogs, 'new'));
          break;
        case 'old':
          setBlogs(sortByTime(blogs, 'old'));
          break;
        default:
          break;
      }
    } else {
      toast.error('Please use one of the actual sort values');
      return;
    }
  };

  return (
    <div className="h-12 flex-col df">
      <label className="font-bold" htmlFor="sortOptions">
        Sort By:
      </label>

      <select name="sortOptions" id="sortOptions" defaultValue="new" onChange={onSort}>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="new">New</option>
        <option value="old">Old</option>
      </select>
    </div>
  );
}
