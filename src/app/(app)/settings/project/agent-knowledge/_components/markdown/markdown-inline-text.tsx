import { parseInline } from '../../_utils/parse-markdown';
import { MarkdownInlinePart } from './markdown-inline-part';

type MarkdownInlineTextProps = {
  text: string;
};

export function MarkdownInlineText({ text }: MarkdownInlineTextProps) {
  return parseInline(text).map((part, index) => (
    <MarkdownInlinePart key={index} part={part} />
  ));
}
