interface CurrentVersionTagProps {
  isCurrent: boolean;
}

export function CurrentVersionTag({ isCurrent }: CurrentVersionTagProps) {
  if (!isCurrent) return null;

  return (
    <span
      data-current
      className="rounded-sm bg-emerald-100 px-1.5 py-0.5 font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
    >
      Current
    </span>
  );
}
