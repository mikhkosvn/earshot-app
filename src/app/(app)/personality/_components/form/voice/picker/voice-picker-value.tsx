interface VoicePickerValueProps {
  value: string;
}

export function VoicePickerValue({ value }: VoicePickerValueProps) {
  if (!value) {
    return (
      <span className="text-muted-foreground">Type or select a voice ID</span>
    );
  }
  return <span className="truncate font-mono text-xs">{value}</span>;
}
