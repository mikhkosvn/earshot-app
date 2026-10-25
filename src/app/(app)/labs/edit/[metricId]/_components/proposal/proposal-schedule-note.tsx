type ProposalScheduleNoteProps = {
  scheduleName: string | null;
};

export function ProposalScheduleNote({
  scheduleName,
}: ProposalScheduleNoteProps) {
  if (!scheduleName) return null;

  return (
    <p className="text-xs text-muted-foreground">
      The schedule &quot;{scheduleName}&quot; made this proposal.
    </p>
  );
}
