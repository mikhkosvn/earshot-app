interface FilterSummaryProps {
  lines: readonly string[];
}

export function FilterSummary({ lines }: FilterSummaryProps) {
  if (lines.length === 0) {
    return <p>No filters applied. This dashboard saves the date range only.</p>;
  }
  return (
    <ul className="flex flex-col gap-0.5">
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}
