import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetToken, useGetUser } from '../../account/useGetToken';

import NotFound from '../../partials/NotFound';
import NotLoggedIn from '../../partials/NotLoggedIn';
import ConnectionError from '../../partials/ConnectionError';

import { ContentTypes, Content } from '../BlogDetail/BlogDetail';

import { fetchSingularBlog } from '../BlogDetail/fetchSingularBlog';
import { isAllowedToEdit } from './isAllowedToEdit';
import AddContentBlockButton from './edit components/AddContentBlockButton';

import { Reorder } from 'framer-motion';

import ContentRenderer from '../BlogDetail/ContentRenderer';
import ContentTypeSelector from './edit components/ContentTypeSelecter';
import AutoResizeTextArea from './edit components/AutoResizeTextArea';
import UpdateBlogButton from './edit components/UpdateBlogButton';
import DeleteBlockButton from './edit components/DeleteBlogButton';

function EditBlog() {
  const { id } = useParams();
  const token = useGetToken();
  const user = useGetUser();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [isPublished, setIsPublished] = useState<boolean | undefined>(false);
  const [blocks, setBlocks] = useState<Content[]>([]);

  const [content, setContent] = useState('');
  const [selectedType, setSelectedType] = useState<ContentTypes>('text');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<boolean | null>(null);

  useEffect(() => {
    function getBlog() {
      fetchSingularBlog(id)
        .then((fetchedBlog) => {
          if (!fetchedBlog.data) {
            setPermissionError(true);
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
          setError(`Failed to load blog: ${error}`);
          setLoading(false);
        });
    }

    getBlog();
  }, [id]);

  // ? check if user is allowed to edit blog
  useEffect(() => {
    function checkUserCanEditBlog() {
      if (!user) return <NotLoggedIn />;
      if (!id) return <div>Blog was not found</div>;
      if (!token) return <div>Your login expired, please log in again</div>;

      isAllowedToEdit(user?.id, id, token)
        .then((isAllowed) => {
          if (!isAllowed) setPermissionError(true);
        })
        .catch(() => {
          return;
        });
    }
    checkUserCanEditBlog();
  }, [user, id, token]);

  const deleteBlock = (id: string) => {
    const newBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(newBlocks);
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <NotLoggedIn />;
  if (!id) return <div>Blog was not found</div>;
  if (!token) return <div>Your login expired, please log in again</div>;
  if (error === 'Load failed') return <ConnectionError />;
  if (permissionError) return <NotFound />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid w-full grid-cols-[30%_70%] calc-h-vw-1">
      <div className="flex justify-start">
        <form className="flex-col gap-8 df">
          {/* title */}
          <AutoResizeTextArea
            label="title"
            labelContent="Blog Title"
            value={title}
            setterFunction={setTitle}
          />

          {/* summary */}
          <AutoResizeTextArea
            label="summary"
            labelContent="Summary"
            value={summary}
            setterFunction={setSummary}
          />

          <ContentTypeSelector
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            content={content}
            setContent={setContent}
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

          <AddContentBlockButton
            selectedType={selectedType}
            content={content}
            blocks={blocks}
            setBlocks={setBlocks}
            id={id}
          />

          <UpdateBlogButton
            id={id}
            title={title}
            summary={summary}
            isPublished={isPublished}
            blocks={blocks}
            token={token}
          />

          <DeleteBlockButton blogId={id} token={token} />
        </form>
      </div>

      <div className="overflow-auto">
        <h2 className="h2">Blog preview</h2>

        <Reorder.Group
          className="cursor-grab active:cursor-grabbing"
          values={blocks}
          onReorder={setBlocks}
        >
          <ContentRenderer
            content={blocks}
            isCreationMode={true}
            onDeleteBlock={deleteBlock}
          />
        </Reorder.Group>
      </div>
    </div>
  );
}

export default EditBlog;
