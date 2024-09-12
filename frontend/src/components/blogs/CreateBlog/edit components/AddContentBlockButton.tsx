import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';

import { Content } from '../../BlogDetail/BlogDetail';
import { ContentTypes } from '../../BlogDetail/BlogDetail';
import { allowedTypes } from '../../BlogDetail/allowedTypes';

interface AddContentBlockButtonProps {
  selectedType: ContentTypes;
  content: string;
  blocks: Content[];
  setBlocks: (newBlocks: Content[]) => void;
  id: string;
}

function AddContentBlockButton({
  selectedType,
  content,
  blocks,
  setBlocks,
  id,
}: AddContentBlockButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (content === '' && selectedType !== 'line break') return;
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

    if (allowedTypes.includes(selectedType)) {
      const newBlock: Content = {
        id: uuid(),
        type: selectedType,
        content,
        order: blocks.length + 1,
        blogId: id,
      };
      setBlocks([...blocks, newBlock]);
    } else {
      toast.error("Don't change this! 😡");
    }
  };

  return (
    <button className="prm-button h-12 w-full" onClick={handleClick}>
      Add Content Block
    </button>
  );
}

export default AddContentBlockButton;
