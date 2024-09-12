import { Content } from './BlogDetail';
import { Reorder } from 'framer-motion';
import { toast } from 'react-toastify';

import Prism from 'prismjs';
import { useEffect } from 'react';
import '../../../css/prism.css';
import 'prismjs/themes/prism-twilight.css';

interface ContentRendererInterface {
  blocks: Content[];
  setBlocks?: (newContent: Content[]) => void;
  isCreationMode?: boolean;
}

function ContentRenderer({
  blocks,
  setBlocks,
  isCreationMode,
}: ContentRendererInterface) {
  useEffect(() => {
    Prism.highlightAll();
  }, [blocks]);

  const deleteBlock = (id: string) => {
    if (!setBlocks) return;
    const newBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(newBlocks);
  };

  const copyBlock = (content: string) => {
    const copiedContent = content;

    navigator.clipboard
      .writeText(copiedContent)
      .then(() => {
        toast.info('Text copied to clipboard', { autoClose: 2500 });
      })
      .catch(() => {
        toast.error('Could not copy text');
      });
  };

  const renderedContent = blocks.map((contentItem, index) => {
    contentItem.order = index + 1;

    const contentElement = (
      <div className="grid grid-cols-[80%_20%] gap-2 sm:grid-cols-[85%_15%] lg:grid-cols-[87%_13%]">
        <div>
          {contentItem.type === 'large header' && (
            <h1 className="text-left text-5xl font-black">{contentItem.content}</h1>
          )}

          {contentItem.type === 'header' && (
            <h2 className="text-left h2">{contentItem.content}</h2>
          )}

          {contentItem.type === 'small header' && (
            <h1 className="text-left text-2xl font-bold">{contentItem.content}</h1>
          )}

          {contentItem.type === 'text' && (
            <div className="whitespace-pre-wrap text-left">{contentItem.content}</div>
          )}

          {contentItem.type === 'image' && (
            <img src={`${contentItem.content}`} alt={`${contentItem.content}`} />
          )}

          {contentItem.type === 'line break' && <br />}

          {contentItem.type === 'code block' && (
            <pre className="flex justify-start">
              <code className="language-javascript">{contentItem.content}</code>
            </pre>
          )}
        </div>

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

export default ContentRenderer;
