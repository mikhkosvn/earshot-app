interface ChangedBadgeProps {
  isChanged: boolean;
}

export function ChangedBadge({ isChanged }: ChangedBadgeProps) {
  if (!isChanged) return null;

  return (
    <span className="rounded-sm bg-amber-100 px-1.5 py-0.5 text-[11px] font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-300">
      Changed in last run
    </span>
  );
}
