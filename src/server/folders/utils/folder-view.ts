import 'server-only';

import { FolderSystemRole } from '@/generated/prisma/enums';
import {
  folderName,
  folderPathSegments,
  parentFolderPath,
} from '@/server/folders/utils/folder-path';
import type { FolderView } from '@/server/folders/types';

interface FolderRow {
  id: number;
  path: string;
  systemRole: FolderSystemRole | null;
  createdAt: Date;
  _count: { evaluators: number };
}

const toFolderView = (row: FolderRow): FolderView => ({
  id: row.id,
  name: folderName(row.path),
  path: row.path,
  depth: folderPathSegments(row.path).length - 1,
  systemRole: row.systemRole,
  isRegressionSuite: row.systemRole === FolderSystemRole.regression_suite,
  isDeletable: row.systemRole === null,
  isRenamable: row.systemRole !== FolderSystemRole.regression_suite,
  evaluatorCount: row._count.evaluators,
  createdAt: row.createdAt,
});

const rootRank = (row: FolderRow) => {
  if (row.systemRole === FolderSystemRole.regression_suite) return 0;
  return 1;
};

const compareRows = (left: FolderRow, right: FolderRow) =>
  rootRank(left) - rootRank(right) ||
  left.createdAt.getTime() - right.createdAt.getTime() ||
  left.id - right.id;

const treeParent = (parent: string | null, knownPaths: Set<string>) => {
  if (parent === null || !knownPaths.has(parent)) return null;
  return parent;
};

export const toFolderTree = (rows: FolderRow[]) => {
  const childrenOf = new Map<string | null, FolderRow[]>();
  const knownPaths = new Set(rows.map((row) => row.path));
  for (const row of rows) {
    const key = treeParent(parentFolderPath(row.path), knownPaths);
    childrenOf.set(key, [...(childrenOf.get(key) ?? []), row]);
  }
  const ordered: FolderView[] = [];
  const visit = (parent: string | null) => {
    for (const row of (childrenOf.get(parent) ?? []).toSorted(compareRows)) {
      ordered.push(toFolderView(row));
      visit(row.path);
    }
  };
  visit(null);
  return ordered;
};
