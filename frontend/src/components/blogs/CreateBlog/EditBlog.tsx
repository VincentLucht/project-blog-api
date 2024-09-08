import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetToken, useGetUser } from '../../account/useGetToken';
import NotLoggedIn from '../../partials/NotLoggedIn';
import ConnectionError from '../../partials/ConnectionError';

import contentRenderer from '../BlogDetail/contentRenderer';
import { getPlaceholder } from './getPlaceholder';

import { ContentTypes, Content, CompleteBlogItem } from '../BlogDetail/BlogDetail';
import { toast } from 'react-toastify';

import { fetchSingularBlog } from '../BlogDetail/fetchSingularBlog';
import { updateBlog } from './updateBlog';

import { Reorder } from 'framer-motion';
import { v4 as uuid } from 'uuid';

function EditBlog() {
  const { id } = useParams();
  const token = useGetToken();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [isPublished, setIsPublished] = useState<boolean | undefined>(false);
  const [blocks, setBlocks] = useState<Content[]>([]);

  const [content, setContent] = useState('');
  const [selectedType, setSelectedType] = useState<ContentTypes>('text');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function getBlog() {
      fetchSingularBlog(id)
        .then((fetchedBlog) => {
          if (!fetchedBlog.data) {
            // TODO add a nicer blog was not found message
            setError('The blog was not found');
            setLoading(false);
            return;
          }

          setTitle(fetchedBlog.data.title);
          setSummary(fetchedBlog.data.summary);
          setIsPublished(fetchedBlog.data.is_published);
          setBlocks(fetchedBlog.data.content);
          setLoading(false);
        })
        .catch((error) => {
          // TODO add a nicer failed to load blog component
          setError(`Failed to load blog: ${error}`);
          setLoading(false);
        });
    }

    getBlog();
  }, [id]);

  const addNewBlock = (newBlock: Content) => {
    if (content === '') return;
    if (blocks.length === 500) {
      toast.warn(
        'You have reached 500 blocks, which is half of the limit of 1000 blocks',
      );
    }
    if (blocks.length >= 1000) {
      toast.error('You have reached the limit of 1000 blocks', { autoClose: false });
      toast.info('Please try to optimize by removing unnecessary blocks', {
        autoClose: false,
      });
      return;
    }

    setBlocks([...blocks, newBlock]);
  };

  const deleteBlock = (id: string) => {
    const newBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(newBlocks);
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
  if (!id) return <div>Blog was not found</div>;
  if (!token) return <div>Your login expired, please log in again</div>;

  return (
    <div className="grid w-full grid-cols-[30%_70%]">
      <form className="flex-col gap-8 df">
        {/* title */}
        <input
          className="p-3"
          type="text"
          value={title}
          onChange={(e) => handleInputChange(e, setTitle)}
          placeholder="Title"
        />

        {/* summary */}
        <input
          className="p-3"
          type="text"
          value={summary}
          onChange={(e) => handleInputChange(e, setSummary)}
          placeholder="Summary"
        />

        {/* is_published */}
        <div className="gap-2 df">
          <div className="gap-4 df">
            <label htmlFor="is-published">Publish</label>
            <input
              type="checkbox"
              id="is-published"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
          </div>
          <div>{isPublished ? 'Yes' : 'No'}</div>
        </div>

        <div>
          {/* TODO: add a proper label here */}
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
            addNewBlock({
              id: uuid(),
              type: selectedType,
              content,
              order: blocks.length + 1,
              blogId: id,
            });
          }}
          className="border p-4"
        >
          Add Block
        </button>

        {/* Updating the blog */}
        <button
          onClick={(e) => {
            e.preventDefault();
            const updatedBlogItem: CompleteBlogItem = {
              id, // ? blog id
              title,
              summary,
              is_published: isPublished,
              updated_at: new Date(Date.now()).toISOString(),
              content: blocks,
            };
            updateBlog(updatedBlogItem, token)
              .then(() => {
                toast.success('Successfully updated the blog');
              })
              .catch((error: unknown) => {
                console.log(error);
              });
          }}
          className="border p-4"
        >
          Update Blog
        </button>
      </form>

      <div>
        <h2 className="h2">Blog preview</h2>

        <Reorder.Group
          className="cursor-grab active:cursor-grabbing"
          values={blocks}
          onReorder={setBlocks}
        >
          <div>{contentRenderer(blocks, true, deleteBlock)}</div>
        </Reorder.Group>
      </div>
    </div>
  );
}

export default EditBlog;
