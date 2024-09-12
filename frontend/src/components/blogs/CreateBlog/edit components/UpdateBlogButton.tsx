import { toast } from 'react-toastify';
import { updateBlog } from '../updateBlog';

import { CompleteBlogItem } from '../../BlogDetail/BlogDetail';
import { Content } from '../../BlogDetail/BlogDetail';

interface UpdateBlogButtonProps {
  id: string;
  title: string;
  summary: string;
  isPublished: boolean | undefined;
  blocks: Content[];
  token: string;
}

function UpdateBlogButton({
  id,
  title,
  summary,
  isPublished,
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
          updated_at: new Date(Date.now()).toISOString(),
          content: blocks,
        };
        updateBlog(updatedBlogItem, token)
          .then(() => {
            toast.success('Successfully updated the blog');
          })
          .catch(() => {
            toast.error('An error occurred while updating the blog');
          });
      }}
      className="prm-button h-12 w-full"
    >
      Update Blog
    </button>
  );
}

export default UpdateBlogButton;
