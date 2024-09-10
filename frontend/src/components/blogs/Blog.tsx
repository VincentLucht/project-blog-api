import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export interface BlogInterface {
  id: string;
  title: string;
  summary: string;
  posted_on: Date;
  readMore?: boolean;
  editMode?: boolean;
}

export function Blog({
  id,
  title,
  summary,
  posted_on,
  readMore = true,
  editMode = false,
}: BlogInterface) {
  return (
    <div className="border border-gray-400 p-5 text-left box-shadow-br">
      <div className="mb-[10px]">
        <Link to={editMode ? `/hub/${id}` : `/${id}`}>
          <h3 className="mb-[2px] break-words text-3xl font-bold hover:underline">
            {title}
          </h3>
        </Link>

        <div className="text-sm text-gray-400">
          {dayjs(posted_on).format('D MMM YYYY')}
        </div>
      </div>

      <div className="text-gray-300">{summary}</div>

      {readMore && (
        <div className="mt-4">
          {/* TODO: Add link to blog too */}
          <Link className="text-blue-400 underline underline-offset-2">Read more</Link>
        </div>
      )}
    </div>
  );
}
