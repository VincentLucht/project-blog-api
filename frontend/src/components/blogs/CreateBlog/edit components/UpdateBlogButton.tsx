import { toast } from 'react-toastify';
import { updateBlog } from '../util/updateBlog';
import { BlogTags } from '../../BlogDetail/BlogDetail';

import { CompleteBlogItem } from '../../BlogDetail/BlogDetail';
import { Content } from '../../BlogDetail/BlogDetail';

interface UpdateBlogButtonProps {
  id: string;
  title: string;
  summary: string;
  isPublished: boolean | undefined;
  tags: BlogTags[];
  blocks: Content[];
  token: string;
}

function UpdateBlogButton({
  id,
  title,
  summary,
  isPublished,
  tags,
  blocks,
  token,
}: UpdateBlogButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        const updatedBlogItem: CompleteBlogItem = {
          id, // ? blog id
          title,
          summary,
          is_published: isPublished,
          tags,
          updated_at: new Date(Date.now()).toISOString(),
          content: blocks,
        };

        // Show a loading toast
        const toastId = toast.loading('Updating Blog...');

        updateBlog(updatedBlogItem, token)
          .then(() => {
            toast.update(toastId, {
              render: 'Successfully updated the blog',
              type: 'success',
              isLoading: false,
              autoClose: 5000,
            });
          })
          .catch(() => {
            toast.update(toastId, {
              render: 'An error occurred while updating the blog',
              type: 'error',
              isLoading: false,
              autoClose: 5000,
            });
          });
      }}
      className="h-12 w-full prm-button"
    >
      Update Blog
    </button>
  );
}

export default UpdateBlogButton;
