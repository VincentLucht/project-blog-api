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

        updateBlog(updatedBlogItem, token)
          .then(() => {
            toast.success('Successfully updated the blog');
          })
          .catch(() => {
            toast.error('An error occurred while updating the blog');
          });
      }}
      className="h-12 w-full prm-button"
    >
      Update Blog
    </button>
  );
}

export default UpdateBlogButton;
