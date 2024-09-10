import AutoResizeTextArea from './AutoResizeTextArea';
import { getPlaceholder } from '../getPlaceholder';
import { ContentTypes } from '../../BlogDetail/BlogDetail';

interface ContentTypeSelectorProps {
  selectedType: ContentTypes;
  setSelectedType: (newType: ContentTypes) => void;
  content: string;
  setContent: (newContent: string) => void;
}

function ContentTypeSelector({
  selectedType,
  setSelectedType,
  content,
  setContent,
}: ContentTypeSelectorProps) {
  return (
    <div>
      <div>
        <label htmlFor="blog-type">Type</label>
        <select
          name="blog-type"
          id="blog-type"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as ContentTypes)}
        >
          <option value="large header">Large Header</option>
          <option value="header">Header</option>
          <option value="small header">Small Header</option>

          <option value="text">Text</option>

          <option value="image">Image</option>

          <option value="line break">Line Break</option>
          <option value="code block">Code Block</option>
        </select>
      </div>

      <AutoResizeTextArea
        label={getPlaceholder(selectedType)}
        labelContent={false}
        value={content}
        setterFunction={setContent}
      />
    </div>
  );
}

export default ContentTypeSelector;
