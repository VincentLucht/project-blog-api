import dayjs from 'dayjs';
import { BlogItem } from './fetchBlogs';

function sortByAlphabet(data: BlogItem[], mode: 'asc' | 'desc'): BlogItem[] {
  const sortedData = [...data]; // ? Create a copy of the array to avoid mutation
  return sortedData.sort((a: BlogItem, b: BlogItem) =>
    mode === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title),
  );
}

function convertTime(date: string | Date) {
  return dayjs(date).valueOf();
}
function sortByTime(data: BlogItem[], mode: 'new' | 'old') {
  const sortedData = [...data];
  return sortedData.sort((a: BlogItem, b: BlogItem) =>
    mode === 'new'
      ? convertTime(b.updated_at) - convertTime(a.updated_at)
      : convertTime(a.updated_at) - convertTime(b.updated_at),
  );
}

export { sortByAlphabet, sortByTime };
