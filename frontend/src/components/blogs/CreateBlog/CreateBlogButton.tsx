import { useGetToken } from '../../account/useGetToken';
import { useNavigate } from 'react-router-dom';
import { createBlog } from './util/createBlog';
import { toast } from 'react-toastify';

function CreateBlogButton() {
  const navigate = useNavigate();

  const token = useGetToken();
  if (!token) {
    toast.error('You are not logged in!');
    return;
  }

  const onClick = () => {
    // Create a loading toast
    const toastId = toast.loading('Creating Blog...');

    createBlog(token)
      .then((blog) => {
        toast.update(toastId, {
          render: 'Successfully created a new Blog',
          type: 'success',
          isLoading: false,
          autoClose: 5000,
        });
        navigate(`/hub/${blog.blog.id}`);
      })
      .catch((e: { message: string | undefined }) => {
        toast.update(toastId, {
          render: e.message ?? 'There was an error while creating a new Blog',
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        });
      });
  };

  return (
    <button
      className="h-5/6 text-sm prm-button sm:h-full sm:text-base"
      onClick={onClick}
    >
      Create new Blog
    </button>
  );
}

export default CreateBlogButton;
