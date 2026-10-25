import type { SnapshotChange } from '../../_utils/snapshot-diff';

type CompareChangeListProps = {
  changes: SnapshotChange[];
};

export function CompareChangeList({ changes }: CompareChangeListProps) {
  if (changes.length === 0) {
    return (
      <p className="text-xs text-muted-foreground">
        The two versions have the same values.
      </p>
    );
  }

  return (
    <ul className="flex max-h-96 flex-col gap-2 overflow-y-auto">
      {changes.map((change) => (
        <li
          key={change.field}
          className="flex flex-col gap-1 rounded-md border p-2 text-xs"
        >
          <span className="font-medium">{change.label}</span>
          <span className="rounded-sm bg-red-50 px-1.5 py-1 whitespace-pre-wrap text-red-800 line-through dark:bg-red-950 dark:text-red-200">
            {change.before}
          </span>
          <span className="rounded-sm bg-emerald-50 px-1.5 py-1 whitespace-pre-wrap text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
            {change.after}
          </span>
        </li>
      ))}
    </ul>
  );
}
