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
    <div className="flex w-full flex-col gap-2">
      <div className="grid grid-cols-[40%_40%_20%]">
        <label className="font-bold" htmlFor="blog-type">
          Type
        </label>

        <select
          name="blog-type"
          id="blog-type"
          className="rounded-3xl p-2"
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
        maxHeight={500}
      />
    </div>
  );
}

export default ContentTypeSelector;
