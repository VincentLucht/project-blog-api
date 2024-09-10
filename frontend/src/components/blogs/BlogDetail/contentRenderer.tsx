import { Content } from './BlogDetail';
import { Reorder } from 'framer-motion';

import Prism from 'prismjs';
import { useEffect } from 'react';
import '../../../css/prism.css';
import 'prismjs/themes/prism-twilight.css';

interface ContentRendererInterface {
  content: Content[];
  isCreationMode?: boolean;
  onDeleteBlock?: (id: string) => void;
}

function ContentRenderer({
  content,
  isCreationMode,
  onDeleteBlock,
}: ContentRendererInterface) {
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  const renderedContent = content.map((contentItem, index) => {
    contentItem.order = index + 1;

    const contentElement = (
      <div className="grid grid-cols-[90%_10%] gap-2">
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

        {isCreationMode && onDeleteBlock && (
          <div className="flex content-center justify-around">
            <div className="w-7 df">{contentItem.order}</div>
            <button onClick={() => onDeleteBlock(contentItem.id)}>
              <img src="/close.svg" alt="close" className="h-8 w-8" />
            </button>
          </div>
        )}
      </div>
    );

    return isCreationMode ? (
      <Reorder.Item className="mr-4" key={contentItem.id} value={contentItem}>
        {contentElement}
      </Reorder.Item>
    ) : (
      <div key={contentItem.id}>{contentElement}</div>
    );
  });

  return <div>{renderedContent}</div>;
}

export default ContentRenderer;
