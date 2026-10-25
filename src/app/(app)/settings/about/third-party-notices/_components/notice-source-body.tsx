type NoticeSourceBodyProps = {
  repositoryUrl: string | null;
};

export function NoticeSourceBody({ repositoryUrl }: NoticeSourceBodyProps) {
  if (!repositoryUrl) {
    return (
      <p className="text-xs text-muted-foreground">
        The package lists no source repository.
      </p>
    );
  }
  return (
    <a
      href={repositoryUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs break-all text-primary underline-offset-4 hover:underline"
    >
      {repositoryUrl}
    </a>
  );
}
