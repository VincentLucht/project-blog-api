import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';

import { Content } from '../../BlogDetail/BlogDetail';

interface AddContentBlockButtonProps {
  content: string;
  setContent: (newValue: string) => void;
  blocks: Content[];
  setBlocks: (newBlocks: Content[]) => void;
  id: string;
}

function AddContentBlockButton({
  content,
  setContent,
  blocks,
  setBlocks,
  id,
}: AddContentBlockButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (blocks.length === 500) {
      toast.warn(
        'You have reached 500 blocks, which is half of the limit of 1000 blocks',
      );
    }
    if (blocks.length >= 1000) {
      toast.error('You have reached the limit of 1000 blocks', { autoClose: false });
      toast.info('Please try to optimize by removing unnecessary blocks', {
        autoClose: false,
      });
      return;
    }

    const newBlock: Content = {
      id: uuid(),
      content,
      order: blocks.length + 1,
      blogId: id,
    };

    setContent('');
    setBlocks([...blocks, newBlock]);
  };

  return (
    <button className="h-12 w-full prm-button" onClick={handleClick}>
      Add Content Block
    </button>
  );
}

export default AddContentBlockButton;
