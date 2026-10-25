import type { MarkdownHeadingLevel } from '../../_utils/parse-markdown';
import { MarkdownInlineText } from './markdown-inline-text';

const HEADING_CLASS: Record<MarkdownHeadingLevel, string> = {
  1: 'text-lg font-semibold',
  2: 'text-base font-semibold',
  3: 'text-sm font-semibold',
};

type MarkdownHeadingProps = {
  level: MarkdownHeadingLevel;
  text: string;
};

export function MarkdownHeading({ level, text }: MarkdownHeadingProps) {
  return (
    <p role="heading" aria-level={level + 1} className={HEADING_CLASS[level]}>
      <MarkdownInlineText text={text} />
    </p>
  );
}
