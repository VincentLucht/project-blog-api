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

  if (loading) return <div>Loading...</div>;
  if (!user) return <NotLoggedIn />;
  if (!id) return <div>Blog was not found</div>;
  if (!token) return <div>Your login expired, please log in again</div>;
  if (error === 'Load failed') return <ConnectionError />;
  if (permissionError) return <NotFound />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="calc-h-vw-2 grid w-full grid-cols-[40%_60%] sm:grid-cols-[35%_65%]">
      <div className="flex justify-start">
        <form className="w-11/12 flex-col gap-8 df">
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
          <div className="grid w-full grid-cols-[40%_40%_20%]">
            <div className="">
              <label htmlFor="is-published" className="font-bold">
                Publish
              </label>
            </div>

            <div className="flex items-center gap-2">
              {isPublished ? 'Yes' : 'No'}
              <input
                type="checkbox"
                id="is-published"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
            </div>
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

      <div className="-mr-4 overflow-auto pr-4">
        <h2 className="mb-4 h2">Blog preview</h2>

        <Reorder.Group
          className="cursor-grab active:cursor-grabbing"
          values={blocks}
          onReorder={setBlocks}
        >
          <ContentRenderer
            blocks={blocks}
            setBlocks={setBlocks}
            isCreationMode={true}
          />
        </Reorder.Group>
      </div>
    </div>
  );
}

export default EditBlog;
