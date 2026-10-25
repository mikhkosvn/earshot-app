import { parseInline } from '../../_utils/parse-markdown';
import { MarkdownInlinePart } from './markdown-inline-part';

interface MarkdownInlineTextProps {
  text: string;
}

export function MarkdownInlineText({ text }: MarkdownInlineTextProps) {
  return parseInline(text).map((part, index) => (
    <MarkdownInlinePart key={index} part={part} />
  ));
}
