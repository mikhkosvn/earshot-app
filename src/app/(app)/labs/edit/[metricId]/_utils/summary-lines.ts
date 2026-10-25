import { SUMMARY_HEADINGS } from '@/server/metric-optimizer/constants/optimizer-text';

export const SummaryLineKind = {
  bullet: 'bullet',
  labeled: 'labeled',
  plain: 'plain',
} as const;

export type SummaryLineKind =
  (typeof SummaryLineKind)[keyof typeof SummaryLineKind];

export interface SummaryLine {
  kind: SummaryLineKind;
  label: string;
  text: string;
}

const BULLET_PREFIX = '- ';
const HEADINGS: string[] = Object.values(SUMMARY_HEADINGS);

const toLine = (line: string): SummaryLine => {
  if (line.startsWith(BULLET_PREFIX)) {
    return {
      kind: SummaryLineKind.bullet,
      label: '',
      text: line.slice(BULLET_PREFIX.length),
    };
  }
  const heading = HEADINGS.find((item) => line.startsWith(item));
  if (heading) {
    return {
      kind: SummaryLineKind.labeled,
      label: heading,
      text: line.slice(heading.length).trim(),
    };
  }
  return { kind: SummaryLineKind.plain, label: '', text: line };
};

export const summaryLines = (summary: string) =>
  summary
    .split('\n')
    .filter((line) => line.trim())
    .map(toLine);
