export function MembersHeader() {
  return (
    <div className="flex flex-col gap-1 py-1">
      <h1 className="text-lg font-semibold">Team members</h1>
      <p className="text-xs text-muted-foreground">
        Who is in your organization, which projects they can open, and who gets
        each project&apos;s email alerts.
      </p>
    </div>
  );
}
