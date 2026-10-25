type ProjectIdBadgeProps = {
  projectId: number;
};

export function ProjectIdBadge({ projectId }: ProjectIdBadgeProps) {
  return (
    <span className="flex h-5 min-w-5 items-center justify-center rounded-sm border bg-muted px-0.5 text-xs text-muted-foreground">
      {projectId}
    </span>
  );
}
