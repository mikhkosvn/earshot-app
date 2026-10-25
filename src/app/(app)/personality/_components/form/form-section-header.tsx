type FormSectionHeaderProps = {
  title: string;
  description: string;
};

export function FormSectionHeader({
  title,
  description,
}: FormSectionHeaderProps) {
  return (
    <div className="border-y bg-muted/40 px-3 py-2 first:border-t-0">
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
