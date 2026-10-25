import 'server-only';

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { cacheLife } from 'next/cache';

import type { ThirdPartyNotice } from '@/server/third-party-notices/types';
import { readPackageNotice } from '@/server/third-party-notices/utils/read-package-notice';

type ProjectManifest = {
  dependencies?: Record<string, string>;
};

export async function listThirdPartyNotices(): Promise<ThirdPartyNotice[]> {
  'use cache';
  cacheLife('max');

  const root = process.cwd();
  const manifest = JSON.parse(
    await readFile(path.join(root, 'package.json'), 'utf8'),
  ) as ProjectManifest;
  const names = Object.keys(manifest.dependencies ?? {}).sort();
  const notices = await Promise.all(
    names.map((name) =>
      readPackageNotice(path.join(root, 'node_modules'), name),
    ),
  );
  return notices.filter((notice) => notice !== null);
}
