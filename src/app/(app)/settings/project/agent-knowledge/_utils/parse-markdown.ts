import {
  MarkdownBlockKind,
  MarkdownInlineKind,
} from '../_constants/markdown-kinds';

export type MarkdownHeadingLevel = 1 | 2 | 3;

export type MarkdownBlock =
  | {
      kind: typeof MarkdownBlockKind.heading;
      level: MarkdownHeadingLevel;
      text: string;
    }
  | { kind: typeof MarkdownBlockKind.list; ordered: boolean; items: string[] }
  | { kind: typeof MarkdownBlockKind.paragraph; text: string }
  | { kind: typeof MarkdownBlockKind.code; text: string };

export interface MarkdownInline {
  kind: MarkdownInlineKind;
  text: string;
}

const FENCE = /^\s*```/;
const HEADING = /^(#{1,3})\s+(.*)$/;
const UNORDERED_ITEM = /^\s*[-*+]\s+(.*)$/;
const ORDERED_ITEM = /^\s*\d+[.)]\s+(.*)$/;
const INLINE_TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\s][^*]*\*|_[^_\s][^_]*_)/;

const isMarkdownHeadingLevel = (level: number): level is MarkdownHeadingLevel =>
  level >= 1 && level <= 3;

interface ParserState {
  blocks: MarkdownBlock[];
  paragraph: string[];
  list: { ordered: boolean; items: string[] } | null;
  code: string[] | null;
}

const flushParagraph = (state: ParserState) => {
  if (state.paragraph.length === 0) return;
  state.blocks.push({
    kind: MarkdownBlockKind.paragraph,
    text: state.paragraph.join('\n'),
  });
  state.paragraph = [];
};

const flushList = (state: ParserState) => {
  if (!state.list) return;
  state.blocks.push({ kind: MarkdownBlockKind.list, ...state.list });
  state.list = null;
};

const flushText = (state: ParserState) => {
  flushParagraph(state);
  flushList(state);
};

const addListItem = (state: ParserState, ordered: boolean, item: string) => {
  flushParagraph(state);
  if (state.list?.ordered !== ordered) flushList(state);
  state.list ??= { ordered, items: [] };
  state.list.items.push(item);
};

const readCodeLine = (state: ParserState, line: string) => {
  if (!state.code) return false;
  if (FENCE.test(line)) {
    state.blocks.push({
      kind: MarkdownBlockKind.code,
      text: state.code.join('\n'),
    });
    state.code = null;
    return true;
  }
  state.code.push(line);
  return true;
};

const readLine = (state: ParserState, line: string) => {
  if (readCodeLine(state, line)) return;
  if (FENCE.test(line)) {
    flushText(state);
    state.code = [];
    return;
  }
  if (!line.trim()) {
    flushText(state);
    return;
  }
  const heading = HEADING.exec(line);
  const level = heading?.[1].length ?? 0;
  if (heading && isMarkdownHeadingLevel(level)) {
    flushText(state);
    state.blocks.push({
      kind: MarkdownBlockKind.heading,
      level,
      text: heading[2],
    });
    return;
  }
  const unordered = UNORDERED_ITEM.exec(line);
  if (unordered) return addListItem(state, false, unordered[1]);
  const ordered = ORDERED_ITEM.exec(line);
  if (ordered) return addListItem(state, true, ordered[1]);
  flushList(state);
  state.paragraph.push(line.trim());
};

export const parseMarkdown = (text: string): MarkdownBlock[] => {
  const state: ParserState = {
    blocks: [],
    paragraph: [],
    list: null,
    code: null,
  };
  text.split(/\r?\n/).forEach((line) => readLine(state, line));
  if (state.code) {
    state.blocks.push({
      kind: MarkdownBlockKind.code,
      text: state.code.join('\n'),
    });
  }
  flushText(state);
  return state.blocks;
};

const toInline = (token: string): MarkdownInline => {
  if (token.startsWith('**')) {
    return { kind: MarkdownInlineKind.bold, text: token.slice(2, -2) };
  }
  if (token.startsWith('`')) {
    return { kind: MarkdownInlineKind.code, text: token.slice(1, -1) };
  }
  if (token.startsWith('*') || token.startsWith('_')) {
    return { kind: MarkdownInlineKind.italic, text: token.slice(1, -1) };
  }
  return { kind: MarkdownInlineKind.text, text: token };
};

const partToInline = (part: string, index: number): MarkdownInline => {
  if (index % 2 === 1) return toInline(part);
  return { kind: MarkdownInlineKind.text, text: part };
};

export const parseInline = (text: string): MarkdownInline[] =>
  text
    .split(INLINE_TOKEN)
    .map(partToInline)
    .filter((inline) => inline.text !== '');
