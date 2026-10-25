type CodeLineNumbersProps = {
  value: string;
};

export function CodeLineNumbers({ value }: CodeLineNumbersProps) {
  const lineCount = value.split('\n').length;

  return (
    <div
      aria-hidden
      className="sticky left-0 flex min-h-full shrink-0 flex-col bg-muted px-2 py-1.5 text-right font-mono text-xs/5 text-muted-foreground select-none"
    >
      {Array.from({ length: lineCount }, (_, index) => (
        <span key={index}>{index + 1}</span>
      ))}
    </div>
  );
}
