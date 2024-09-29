import { ReactNode } from 'react';

export default function Help() {
  return (
    <div className="mx-auto max-w-3xl rounded-lg p-6 text-left shadow-lg">
      <h1 className="mb-6 text-center text-3xl font-bold text-blue-500">Help Center</h1>
      <Section title="Text Editor Features">
        <p className="font-bold">
          Powered by tinyMCE, it behaves like a normal text editor, you can:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Mark text (bold, underline, strikethrough, italic, etc)</li>
          <li>Change font, font size, color</li>
          <li>Add images, tables, hyperlinks</li>
        </ul>
      </Section>

      <Section title="Other Edit Features">
        <Subsection title="Tags">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Tags are optional, but will be considered when filtering through blogs
            </li>
          </ul>
        </Subsection>
        <Subsection title="Publishing">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              You can decide whether to publish your blog - you can change this any time
            </li>
          </ul>
        </Subsection>
      </Section>

      <Section title="How to add spaces">
        <ul className="list-disc space-y-1 pl-5">
          <li>Click &quot;Add Content Block&quot; to add spacing</li>
          <li>Add space in the text editor</li>
        </ul>
      </Section>

      <Section title="Reordering Content Blocks">
        <p>Just drag and drop them! The order is handled automatically</p>
      </Section>

      <Section title="Limitations">
        <ul className="list-disc space-y-1 pl-5">
          <li>The Content Block limit is 1000 blocks, which should be plenty</li>
          <li>
            The title cannot exceed 100 characters, and the summary cannot exceed 150
            characters
          </li>
          <li>Deleting the Blog is irreversible - it is deleted from the database</li>
        </ul>
      </Section>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-left text-2xl font-semibold text-blue-500">{title}</h2>
      {children}
    </section>
  );
}

function Subsection({ title, children }: SectionProps) {
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-left text-xl font-medium text-blue-400">{title}</h3>
      {children}
    </div>
  );
}
