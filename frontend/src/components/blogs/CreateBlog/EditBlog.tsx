import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useGetToken, useGetUser } from '../../account/useGetToken';

import { Content } from '../BlogDetail/BlogDetail';
import { BlogTags } from '../BlogDetail/BlogDetail';

import { fetchSingularBlog } from '../BlogDetail/fetchSingularBlog';
import { isAllowedToEdit } from './util/isAllowedToEdit';

import { Reorder } from 'framer-motion';

import AddContentBlockButton from './edit components/AddContentBlockButton';
import ContentRenderer from '../BlogDetail/ContentRenderer';
import AutoResizeTextArea from './edit components/AutoResizeTextArea';
import UpdateBlogButton from './edit components/UpdateBlogButton';
import DeleteBlockButton from './edit components/DeleteBlogButton';
import AddTags from './edit components/AddTags';

import NotFound from '../../partials/NotFound';
import NotLoggedIn from '../../partials/NotLoggedIn';
import ConnectionError from '../../partials/ConnectionError';
import Loading from '../../partials/Loading';

// ? Lazy load the TextEditor component
const TextEditor = lazy(() => import('./edit components/TextEditor'));

function EditBlog() {
  const { id } = useParams();
  const token = useGetToken();
  const user = useGetUser();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [isPublished, setIsPublished] = useState<boolean | undefined>(false);
  const [blocks, setBlocks] = useState<Content[]>([]);
  const [selectedTags, setSelectedTags] = useState<BlogTags[]>([]);

  const [content, setContent] = useState('');

  const [loading, setLoading] = useState(true);
  const [editorLoaded, setEditorLoaded] = useState(false);
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
          setSelectedTags(fetchedBlog.data.tags);
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

  if (loading) return <Loading />;
  if (!user) return <NotLoggedIn />;
  if (!id) return <div>Blog was not found</div>;
  if (!token) return <div>Your login expired, please log in again</div>;
  if (error === 'Load failed') return <ConnectionError />;
  if (permissionError) return <NotFound />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid w-full grid-cols-[50%_50%] calc-h-vw-2 sm:grid-cols-[50%_50%]">
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

          <AddTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

          {/* is_published */}
          <div className="grid w-full grid-cols-[40%_40%_20%]">
            <div>
              <label htmlFor="is-published" className="font-bold">
                Publish
              </label>
            </div>

            <div className="flex items-center gap-2">
              {isPublished ? 'Yes' : 'No'}
              <input
                type="checkbox"
                className="h-6 w-6"
                id="is-published"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
            </div>
          </div>

          <div className="w-full">
            <Suspense
              fallback={
                <div className="flex h-64 w-full animate-pulse items-center justify-center rounded-md bg-gray-200">
                  <p className="text-gray-500">Loading editor...</p>
                </div>
              }
            >
              <div
                className={`transition-opacity duration-300 ${editorLoaded ? 'opacity-100' : 'opacity-0'}`}
              >
                <TextEditor
                  value={content}
                  setterFunction={setContent}
                  onLoad={() => setEditorLoaded(true)}
                />
              </div>
            </Suspense>
          </div>

          <AddContentBlockButton
            content={content}
            setContent={setContent}
            blocks={blocks}
            setBlocks={setBlocks}
            id={id}
          />

          <UpdateBlogButton
            id={id}
            title={title}
            summary={summary}
            isPublished={isPublished}
            tags={selectedTags}
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
