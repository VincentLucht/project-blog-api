import { useGetToken } from '../../account/useGetToken';
import { createBlog } from './createBlog';
import { toast } from 'react-toastify';

function CreateBlogButton() {
  const token = useGetToken();
  if (!token) {
    toast.error('You are not logged in!');
    return;
  }

  const onClick = () => {
    createBlog(token)
      .then(() => toast.success('Successfully created a new Blog'))
      .catch(() => toast.error('There was an error while creating a new Blog'));
  };

  return <button onClick={onClick}>Create new Blog</button>;
}

export default CreateBlogButton;
