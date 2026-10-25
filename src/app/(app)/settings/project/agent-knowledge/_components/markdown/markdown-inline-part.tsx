import { MarkdownInlineKind } from '../../_constants/markdown-kinds';
import type { MarkdownInline } from '../../_utils/parse-markdown';

interface MarkdownInlinePartProps {
  part: MarkdownInline;
}

export function MarkdownInlinePart({ part }: MarkdownInlinePartProps) {
  if (part.kind === MarkdownInlineKind.bold) {
    return <strong className="font-semibold">{part.text}</strong>;
  }
  if (part.kind === MarkdownInlineKind.italic) return <em>{part.text}</em>;
  if (part.kind === MarkdownInlineKind.code) {
    return (
      <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-xs">
        {part.text}
      </code>
    );
  }
  return part.text;
}
