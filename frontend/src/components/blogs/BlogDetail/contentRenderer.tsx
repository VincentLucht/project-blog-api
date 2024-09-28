import { Reorder } from 'framer-motion';
import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import { Content } from './BlogDetail';

interface ContentRendererProps {
  blocks: Content[];
  setBlocks?: (newContent: Content[]) => void;
  isCreationMode?: boolean;
}

export default function ContentRenderer({
  blocks,
  setBlocks,
  isCreationMode = false,
}: ContentRendererProps) {
  const deleteBlock = (id: string) => {
    if (!setBlocks) return;
    const newBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(newBlocks);
  };

  const copyBlock = (content: string) => {
    const blob = new Blob([content], { type: 'text/html' });
    const richTextData = [new ClipboardItem({ 'text/html': blob })];
    navigator.clipboard
      .write(richTextData)
      .then(() => {
        toast.info('Formatted text copied to clipboard', { autoClose: 2500 });
      })
      .catch(() => {
        toast.error('Could not copy formatted text');
      });
  };

  const renderedContent = blocks.map((contentItem, index) => {
    contentItem.order = index + 1;

    const contentElement = (
      <div className="grid grid-cols-[80%_20%] gap-2 sm:grid-cols-[85%_15%] lg:grid-cols-[87%_13%]">
        {/* rendered content */}
        <div
          className={`${contentItem.content === '<p></p>' ? 'mb-5' : 'mb-2'} text-left`}
        >
          {parse(contentItem.content)}
        </div>

        {/* Copy, Order, and Delete */}
        {isCreationMode && (
          <div className="flex content-center justify-between">
            <button onClick={() => copyBlock(contentItem.content)}>
              <img
                className="h-[22px] w-[22px]"
                src="/copy.svg"
                alt="copy content icon"
              />
            </button>

            <div className="w-7 font-bold df">{contentItem.order}</div>

            <button onClick={() => deleteBlock(contentItem.id)}>
              <img className="h-8 w-8" src="/close.svg" alt="close" />
            </button>
          </div>
        )}
      </div>
    );

    return isCreationMode ? (
      <Reorder.Item key={contentItem.id} value={contentItem}>
        {contentElement}
      </Reorder.Item>
    ) : (
      <div key={contentItem.id}>{contentElement}</div>
    );
  });

  return <div>{renderedContent}</div>;
}
