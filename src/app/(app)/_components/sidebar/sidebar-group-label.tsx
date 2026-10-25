interface SidebarGroupLabelProps {
  label: string | null;
}

export function SidebarGroupLabel({ label }: SidebarGroupLabelProps) {
  if (!label) return null;

  return (
    <p className="mb-1 px-2 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase group-data-[collapsed=true]/sidebar:invisible">
      {label}
    </p>
  );
}
