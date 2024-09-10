import { useEffect, useRef } from 'react';

interface AutoResizeTextAreaProps {
  label: string;
  labelContent: string | boolean;
  value: string;
  setterFunction: (newValue: string) => void;
}

function AutoResizeTextArea({
  label,
  labelContent,
  value,
  setterFunction,
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
      summaryTextareaRef.current.style.height =
        summaryTextareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <div className="flex flex-col">
      {labelContent && <label htmlFor={label}>{labelContent}</label>}

      <textarea
        className="edit-textarea"
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
