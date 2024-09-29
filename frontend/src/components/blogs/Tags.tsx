import { BlogTags } from './BlogDetail/BlogDetail';
import convertTag from './util/convertTag';

interface TagsProps {
  tags: BlogTags[] | undefined;
}

export default function Tags({ tags }: TagsProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="mb-5 mt-3 flex cursor-default flex-wrap gap-3">
      {tags?.map((tag, index) => (
        <div
          className="rounded-md border border-gray-300 px-2 py-1 transition-colors duration-200"
          key={index}
        >
          {convertTag(tag)}
        </div>
      ))}
    </div>
  );
}
