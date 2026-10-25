export function ShareTopBar() {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b bg-background px-4">
      <span className="text-sm font-semibold">Earshot</span>
      <span className="text-xs text-muted-foreground">Read-only shared view</span>
    </header>
  );
}
