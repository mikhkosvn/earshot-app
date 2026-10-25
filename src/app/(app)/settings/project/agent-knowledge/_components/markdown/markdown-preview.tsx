import { parseMarkdown } from '../../_utils/parse-markdown';
import { MarkdownBlockView } from './markdown-block-view';

interface MarkdownPreviewProps {
  text: string;
}

export function MarkdownPreview({ text }: MarkdownPreviewProps) {
  const blocks = parseMarkdown(text);

  if (blocks.length === 0) {
    return <p className="text-sm text-muted-foreground">Nothing to preview.</p>;
  }
  return (
    <div className="flex flex-col gap-3 text-sm/relaxed">
      {blocks.map((block, index) => (
        <MarkdownBlockView key={index} block={block} />
      ))}
    </div>
  );
}
