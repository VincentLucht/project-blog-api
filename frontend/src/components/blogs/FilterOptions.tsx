import { useState, useEffect } from 'react';
import { BlogTags } from './BlogDetail/BlogDetail';
import { BlogItem } from './util/fetchBlogs';
import convertTag from './util/convertTag';

interface FilterOptionProps {
  setBlogs: (newBlogs: BlogItem[]) => void;
  originalData: BlogItem[];
}

export default function FilterOptions({ setBlogs, originalData }: FilterOptionProps) {
  const [selectedTags, setSelectedTags] = useState<BlogTags[]>([]);
  const tagsArray = Object.values(BlogTags);

  const onToggle = (tagName: BlogTags) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagName));
    } else {
      setSelectedTags((prevTags) => [...prevTags, tagName]);
    }
  };

  useEffect(() => {
    const hasTags = () => {
      return originalData.filter((blog) =>
        // check if the blog's tag is inside of the selectedTags array
        blog.tags.some((blogTag) => selectedTags.includes(blogTag)),
      );
    };

    if (selectedTags.length > 0) {
      const filteredBlogs = hasTags();
      setBlogs(filteredBlogs);
    } else {
      setBlogs(originalData);
    }
  }, [originalData, setBlogs, selectedTags, selectedTags.length]);

  return (
    <div className="mb-4 flex flex-wrap justify-center gap-8">
      {tagsArray.map((tag, index) => (
        <button
          onClick={() => onToggle(tag)}
          className={`rounded-md border border-gray-300 px-2 py-1 transition-colors duration-200
          hover:cursor-pointer hover:bg-blue-600
          ${selectedTags.includes(tag) ? 'bg-blue-600' : ''}`}
          key={index}
        >
          {convertTag(tag)}
        </button>
      ))}
    </div>
  );
}
