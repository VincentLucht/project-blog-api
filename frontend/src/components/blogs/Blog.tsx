import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export interface User {
  user: {
    id: string;
    name: string;
  };
}

export interface BlogInterface {
  id: string;
  title: string;
  summary: string;
  posted_on: Date;
  readMore?: boolean;
  editMode?: boolean;
  users?: User[];
}

export function Blog({
  id,
  title,
  summary,
  posted_on,
  readMore = true,
  editMode = false,
  users,
}: BlogInterface) {
  return (
    <div
      className="border border-gray-400 p-5 text-left transition-all duration-200 box-shadow-br
        hover:border-blue-400"
    >
      <div>
        <Link to={editMode ? `/hub/${id}` : `/${id}`}>
          <h3 className="mb-[2px] break-words text-3xl font-bold hover:underline">
            {title}
          </h3>
        </Link>
      </div>

      <div className="pl-1">
        <div className="mb-[10px] flex items-baseline gap-1">
          {users?.map((user, index) => (
            <div className="text-base leading-none" key={index}>
              <span>{user.user.name}</span>
              {index !== users.length - 1 && ','}
            </div>
          ))}
          <span className="flex items-center text-sm leading-none text-gray-400">
            on {dayjs(posted_on).format('D MMM, YYYY')}
          </span>
        </div>

        <div className="text-gray-300">{summary}</div>

        {readMore && (
          <div className="mt-4">
            {/* TODO: Add link to blog too */}
            <Link to={`/${id}`} className="text-blue-400 underline underline-offset-2">
              Read more
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
