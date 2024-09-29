import { useNavigate } from 'react-router-dom';
import { deleteBlog } from '../util/deleteBlog';
import { toast } from 'react-toastify';

interface DeleteBlockButtonProps {
  blogId: string;
  token: string;
}

function DeleteBlockButton({ blogId, token }: DeleteBlockButtonProps) {
  const navigate = useNavigate();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const areYouSure = confirm('Are you sure you want to delete this Blog?');
    if (!areYouSure) return;

    const areYouReallySure = confirm('WARNING! This action is irreversible.');

    if (areYouSure && areYouReallySure) {
      deleteBlog(blogId, token)
        .then(() => {
          toast.success('Successfully deleted Blog');
          navigate('/hub');
        })
        .catch(() => {
          toast.info('Your Blog was not deleted', { autoClose: 15000 });
          toast.error('There was an error while deleting the Blog', {
            autoClose: 12500,
          });
        });
    }
  };

  return (
    <button
      className="mb-8 mt-6 h-12 w-full prm-button-red"
      onClick={(e) => handleDelete(e)}
    >
      Delete Blog
    </button>
  );
}

export default DeleteBlockButton;
