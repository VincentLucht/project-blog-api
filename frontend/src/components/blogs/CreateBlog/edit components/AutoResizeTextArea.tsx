import { useEffect, useRef } from 'react';

interface AutoResizeTextAreaProps {
  label: string;
  labelContent: string | boolean;
  value: string;
  setterFunction: (newValue: string) => void;
  maxHeight?: number;
}

function AutoResizeTextArea({
  label,
  labelContent,
  value,
  setterFunction,
  maxHeight = 200,
}: AutoResizeTextAreaProps) {
  const placeholder = label.slice(0, 1).toUpperCase() + label.slice(1);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<any>>,
  ) => {
    setter(e.target.value);
  };

  // ? Auto resize textarea
  const summaryTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (summaryTextareaRef.current) {
      summaryTextareaRef.current.style.height = 'auto';
      const { scrollHeight } = summaryTextareaRef.current;
      summaryTextareaRef.current.style.height =
        scrollHeight > maxHeight ? `${maxHeight}px` : `${scrollHeight}px`;
    }
  }, [value, maxHeight]);

  return (
    <div className="flex w-full flex-col gap-2">
      {labelContent && (
        <div className="grid grid-cols-[40%_40%]">
          <label className="whitespace-nowrap font-bold" htmlFor={label}>
            {labelContent}
          </label>
        </div>
      )}

      <textarea
        className="edit-textarea"
        style={{ maxHeight: `${maxHeight}px` }}
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleInputChange(e, setterFunction)}
        ref={summaryTextareaRef}
      />
    </div>
  );
}

export default AutoResizeTextArea;
