import { BlogTags } from '../../BlogDetail/BlogDetail';
import convertTag from '../../util/convertTag';

interface AddTagsProps {
  selectedTags: BlogTags[];
  setSelectedTags: React.Dispatch<React.SetStateAction<BlogTags[]>>;
}

export default function AddTags({ selectedTags, setSelectedTags }: AddTagsProps) {
  const tagsArray = Object.values(BlogTags);

  const onToggle = (e: React.MouseEvent<HTMLButtonElement>, tagName: BlogTags) => {
    e.preventDefault();

    if (selectedTags.includes(tagName)) {
      setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagName));
    } else {
      setSelectedTags((prevTags) => [...prevTags, tagName]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[40%_40%]">
        <label className="whitespace-nowrap font-bold" htmlFor="tag-selector">
          Tags
        </label>
      </div>

      <div
        id="tag-selector"
        className="flex flex-wrap justify-center gap-5 rounded-3xl border p-4"
      >
        {tagsArray.map((tag, index) => (
          <button
            onClick={(e) => onToggle(e, tag)}
            className={`rounded-md border border-gray-300 px-2 py-1 transition-colors duration-200
            hover:cursor-pointer hover:bg-blue-600
            ${selectedTags.includes(tag) ? 'bg-blue-600' : ''}`}
            key={index}
          >
            {convertTag(tag)}
          </button>
        ))}
      </div>
    </div>
  );
}
