type InitialVersionNoteProps = {
  version: number;
};

export function InitialVersionNote({ version }: InitialVersionNoteProps) {
  if (version !== 1) return null;

  return <span>Initial version</span>;
}
