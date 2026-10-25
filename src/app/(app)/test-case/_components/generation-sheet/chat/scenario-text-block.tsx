interface ScenarioTextBlockProps {
  title: string;
  text: string;
}

export function ScenarioTextBlock({ title, text }: ScenarioTextBlockProps) {
  return (
    <section className="flex flex-col gap-1 rounded-md border bg-muted/40 p-2.5">
      <h4 className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h4>
      <p className="text-xs whitespace-pre-wrap">{text || '-'}</p>
    </section>
  );
}
