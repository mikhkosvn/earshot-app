interface ImproveEdgeCasesProps {
  edgeCases: readonly string[];
}

export function ImproveEdgeCases({ edgeCases }: ImproveEdgeCasesProps) {
  if (edgeCases.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">Resolved edge cases</p>
      <ul className="list-disc pl-5 text-sm text-muted-foreground">
        {edgeCases.map((edgeCase) => (
          <li key={edgeCase}>{edgeCase}</li>
        ))}
      </ul>
    </div>
  );
}
