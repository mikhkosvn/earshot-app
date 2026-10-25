import { MarkdownBlockKind } from '../../_constants/markdown-kinds';
import type { MarkdownBlock } from '../../_utils/parse-markdown';
import { MarkdownHeading } from './markdown-heading';
import { MarkdownInlineText } from './markdown-inline-text';
import { MarkdownList } from './markdown-list';

interface MarkdownBlockViewProps {
  block: MarkdownBlock;
}

export function MarkdownBlockView({ block }: MarkdownBlockViewProps) {
  if (block.kind === MarkdownBlockKind.heading) {
    return <MarkdownHeading level={block.level} text={block.text} />;
  }
  if (block.kind === MarkdownBlockKind.list) {
    return <MarkdownList ordered={block.ordered} items={block.items} />;
  }
  if (block.kind === MarkdownBlockKind.code) {
    return (
      <pre className="overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
        {block.text}
      </pre>
    );
  }
  return (
    <p className="whitespace-pre-line">
      <MarkdownInlineText text={block.text} />
    </p>
  );
}
