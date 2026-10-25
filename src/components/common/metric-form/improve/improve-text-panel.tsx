type ImproveTextPanelProps = {
  title: string;
  text: string;
};

export function ImproveTextPanel({ title, text }: ImproveTextPanelProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <p className="text-xs font-medium text-muted-foreground uppercase">
        {title}
      </p>
      <pre className="max-h-64 overflow-auto rounded-lg border bg-muted/30 p-2.5 font-sans text-xs whitespace-pre-wrap">
        {text}
      </pre>
    </div>
  );
}
