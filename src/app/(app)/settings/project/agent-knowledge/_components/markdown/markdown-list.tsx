import { MarkdownInlineText } from './markdown-inline-text';

interface MarkdownListProps {
  ordered: boolean;
  items: readonly string[];
}

export function MarkdownList({ ordered, items }: MarkdownListProps) {
  const children = items.map((item, index) => (
    <li key={index}>
      <MarkdownInlineText text={item} />
    </li>
  ));

  if (ordered) {
    return (
      <ol className="flex list-decimal flex-col gap-1 pl-5">{children}</ol>
    );
  }
  return <ul className="flex list-disc flex-col gap-1 pl-5">{children}</ul>;
}
