interface StatUnitProps {
  unit: string | null;
}

export function StatUnit({ unit }: StatUnitProps) {
  if (!unit) return null;
  return <span className="text-lg font-normal">{unit}</span>;
}
