export const MarkdownBlockKind = {
  heading: 'heading',
  list: 'list',
  paragraph: 'paragraph',
  code: 'code',
} as const;

export type MarkdownBlockKind =
  (typeof MarkdownBlockKind)[keyof typeof MarkdownBlockKind];

export const MarkdownInlineKind = {
  text: 'text',
  bold: 'bold',
  italic: 'italic',
  code: 'code',
} as const;

export type MarkdownInlineKind =
  (typeof MarkdownInlineKind)[keyof typeof MarkdownInlineKind];

export const KnowledgeTab = {
  write: 'write',
  preview: 'preview',
} as const;

export type KnowledgeTab = (typeof KnowledgeTab)[keyof typeof KnowledgeTab];

export const KNOWLEDGE_PLACEHOLDER = `One rule per line. For example:

- Never remove or shorten the recording disclaimer.
- Offer a human agent after two failed attempts.
- Keep the greeting under fifteen words.`;
