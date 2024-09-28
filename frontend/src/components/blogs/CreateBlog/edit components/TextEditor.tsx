import { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TextEditorProps {
  value: string;
  setterFunction: (newValue: string) => void;
  onLoad: () => void;
}
export default function TextEditor({ value, setterFunction, onLoad }: TextEditorProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoad();
    }, 500);

    return () => clearTimeout(timer);
  }, [onLoad]);

  return (
    <div>
      <div className="grid w-full grid-cols-[40%_40%_20%]"></div>

      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        value={value}
        onEditorChange={(newValue) => {
          setterFunction(newValue);
        }}
        init={{
          plugins: [
            // Core editing features
            'paste',
            'anchor',
            'autolink',
            'charmap',
            'codesample',
            'emoticons',
            'image',
            'link',
            'lists',
            'media',
            'searchreplace',
            'table',
            'visualblocks',
            'wordcount',
            'checklist',
            'mediaembed',
            'casechange',
            'export',
            'formatpainter',
            'pageembed',
            'a11ychecker',
            'tinymcespellchecker',
            'permanentpen',
            'powerpaste',
            'advtable',
            'advcode',
            'editimage',
            'advtemplate',
            'mentions',
            'tableofcontents',
            'footnotes',
            'mergetags',
            'autocorrect',
            'typography',
            'inlinecss',
            'markdown',
          ],
          paste_data_images: true, // Allow pasting images as well
          toolbar:
            'fontfamily fontsize | bold italic underline | forecolor backcolor | align | numlist bullist | outdent indent | undo redo | more',
          toolbar_mode: 'sliding', // Extra tools go into a "more" menu
          setup: (editor) => {
            editor.ui.registry.addContextToolbar('textselection', {
              predicate: () => !editor.selection.isCollapsed(),
              items: 'bold italic underline | fontsizeselect fontselect',
              position: 'node',
              scope: 'node',
            });
          },
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          skin: 'oxide-dark', // Enable dark mode
          content_css: 'dark', // Apply dark mode to content
          placeholder: 'Start typing your content here...', // Placeholder text
        }}
      />
    </div>
  );
}
