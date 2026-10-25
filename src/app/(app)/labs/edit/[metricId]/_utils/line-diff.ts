export const DiffLineKind = {
  same: 'same',
  removed: 'removed',
  added: 'added',
} as const;

export type DiffLineKind = (typeof DiffLineKind)[keyof typeof DiffLineKind];

export type DiffLine = {
  kind: DiffLineKind;
  text: string;
};

const splitLines = (text: string) => {
  if (!text) return [];
  return text.split('\n');
};

const lcsTable = (before: string[], after: string[]) => {
  const table = Array.from({ length: before.length + 1 }, () =>
    new Array<number>(after.length + 1).fill(0),
  );
  for (let i = before.length - 1; i >= 0; i -= 1) {
    for (let j = after.length - 1; j >= 0; j -= 1) {
      if (before[i] === after[j]) {
        table[i][j] = table[i + 1][j + 1] + 1;
        continue;
      }
      table[i][j] = Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }
  return table;
};

export const lineDiff = (beforeText: string, afterText: string) => {
  const before = splitLines(beforeText);
  const after = splitLines(afterText);
  const table = lcsTable(before, after);
  const lines: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < before.length && j < after.length) {
    if (before[i] === after[j]) {
      lines.push({ kind: DiffLineKind.same, text: before[i] });
      i += 1;
      j += 1;
      continue;
    }
    if (table[i + 1][j] >= table[i][j + 1]) {
      lines.push({ kind: DiffLineKind.removed, text: before[i] });
      i += 1;
      continue;
    }
    lines.push({ kind: DiffLineKind.added, text: after[j] });
    j += 1;
  }
  for (; i < before.length; i += 1) {
    lines.push({ kind: DiffLineKind.removed, text: before[i] });
  }
  for (; j < after.length; j += 1) {
    lines.push({ kind: DiffLineKind.added, text: after[j] });
  }
  return lines;
};
