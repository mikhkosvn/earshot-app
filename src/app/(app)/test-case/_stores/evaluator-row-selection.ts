import { type Atom, createAtom } from '@tanstack/react-store';
import type { RowSelectionState } from '@tanstack/react-table';

const rowSelectionByFolder = new Map<string, Atom<RowSelectionState>>();

export const evaluatorRowSelectionAtom = (
  projectId: number,
  folderId: number | null,
) => {
  const key = `${projectId}:${folderId}`;
  const existing = rowSelectionByFolder.get(key);
  if (existing) return existing;
  const atom = createAtom<RowSelectionState>({});
  rowSelectionByFolder.set(key, atom);
  return atom;
};
