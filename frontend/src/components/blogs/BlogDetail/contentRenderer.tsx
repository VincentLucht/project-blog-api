import { Content } from './BlogDetail';

function contentRenderer(
  content: Content[],
  isCreationMode: boolean,
  onDeleteBlock?: (index: number) => void,
) {
  const renderedContent = content.map((content, index) => {
    return (
      <div key={index} className="relative">
        {content.type === 'header' && (
          <h2 className="text-left h2">{content.content}</h2>
        )}
        {content.type === 'image' && (
          <img src={`${content.content}`} alt={`${content.content}`} />
        )}
        {content.type === 'text' && <p className="text-left">{content.content}</p>}

        {/* Add delete button in creation mode */}
        {isCreationMode && (
          <button
            onClick={() => onDeleteBlock?.(index)}
            className="absolute right-0 top-0 p-2 text-red-600"
          >
            Delete
          </button>
        )}
      </div>
    );
  });

  return renderedContent;
}

export default contentRenderer;
