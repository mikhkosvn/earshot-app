import type { MetricVersionView } from '@/server/metrics/types';

import { formatVersionDate, versionLabel } from './_utils/version-text';
import { CurrentVersionTag } from './current-version-tag';
import { InitialVersionNote } from './initial-version-note';

type HistoryEntryProps = {
  version: MetricVersionView;
  isCurrent: boolean;
};

export function HistoryEntry({ version, isCurrent }: HistoryEntryProps) {
  return (
    <li className="flex flex-col gap-1 border-l-2 border-transparent pl-2 text-xs has-data-current:border-emerald-500">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="rounded-sm border px-1.5 py-0.5 font-medium">
          {versionLabel(version.version)}
        </span>
        <CurrentVersionTag isCurrent={isCurrent} />
        <span className="text-muted-foreground">
          {version.createdBy?.name ?? 'Unknown user'}
        </span>
      </div>
      <span>{formatVersionDate(version.createdAt)}</span>
      <InitialVersionNote version={version.version} />
    </li>
  );
}
