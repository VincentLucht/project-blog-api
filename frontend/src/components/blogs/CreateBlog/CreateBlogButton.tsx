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
    createBlog(token)
      .then((blog) => {
        navigate(`/hub/${blog.blog.id}`);
        toast.success('Successfully created a new Blog');
      })
      .catch((e: { message: string | undefined }) => {
        if (e.message) toast.error(`${e.message}`);
        else toast.error('There was an error while creating a new Blog');
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
