interface NoMockToolsNoticeProps {
  count: number;
}

export function NoMockToolsNotice({ count }: NoMockToolsNoticeProps) {
  if (count > 0) return null;
  return (
    <p className="text-xs text-muted-foreground">
      This agent has no mock tools.
    </p>
  );
}
