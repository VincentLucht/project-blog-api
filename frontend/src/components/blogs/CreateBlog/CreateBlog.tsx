import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUser } from '../../account/useGetToken';
import NotLoggedIn from '../../partials/NotLoggedIn';
import ConnectionError from '../../partials/ConnectionError';

import contentRenderer from '../BlogDetail/contentRenderer';
import { getPlaceholder } from './getPlaceholder';

import { ContentTypes, Content } from '../BlogDetail/BlogDetail';
import { toast } from 'react-toastify';

import { fetchSingularBlog } from '../BlogDetail/fetchSingularBlog';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [selectedType, setSelectedType] = useState<ContentTypes>('text');
  const [blocks, setBlocks] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    function getBlog() {
      fetchSingularBlog(id)
        .then((fetchedBlog) => {
          setTitle(fetchedBlog.data.title);
          setSummary(fetchedBlog.data.summary);
          setBlocks(fetchedBlog.data.content);
          setLoading(false);
        })
        .catch((error) => {
          setError(`Failed to load blog: ${error}`);
          setLoading(false);
        });
    }

    getBlog();
  }, [id]);

  const addNewBlock = (newBlock: Content) => {
    if (content === '') return;
    if (blocks.length === 2) {
      toast.warn(
        'You have reached 500 blocks, which is half of the limit of 1000 blocks',
      );
    }
    if (blocks.length >= 5) {
      toast.error('You have reached the limit of 1000 blocks', { autoClose: false });
      toast.info('Please try to optimize by removing unnecessary blocks', {
        autoClose: false,
      });
      return;
    }

    setBlocks([...blocks, newBlock]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setter: React.Dispatch<React.SetStateAction<any>>,
  ) => {
    setter(e.target.value);
  };

  if (!useGetUser()) return <NotLoggedIn />;
  if (loading) return <div>Loading...</div>;
  if (error === 'Load failed') return <ConnectionError />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid w-full grid-cols-[30%_70%]">
      <form className="flex-col gap-8 df">
        <input
          className="p-3"
          type="text"
          value={title}
          onChange={(e) => handleInputChange(e, setTitle)}
          placeholder="Title"
        />

        <input
          className="p-3"
          type="text"
          value={summary}
          onChange={(e) => handleInputChange(e, setSummary)}
          placeholder="Summary"
        />

        <div>
          <select
            name=""
            id=""
            value={selectedType}
            onChange={(e) => handleInputChange(e, setSelectedType)}
          >
            <option value="text">Text</option>
            <option value="header">Header</option>
            <option value="image">Image</option>
          </select>

          <input
            type="text"
            placeholder={getPlaceholder(selectedType)}
            value={content}
            onChange={(e) => handleInputChange(e, setContent)}
          />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            addNewBlock({ type: selectedType, content, order: blocks.length + 1 });
          }}
          className="border p-4"
        >
          Add block
        </button>
      </form>

      <div>
        <h2 className="h2">Blog preview</h2>
        <div>{contentRenderer(blocks)}</div>
      </div>
    </div>
  );
}

export default CreateBlog;
