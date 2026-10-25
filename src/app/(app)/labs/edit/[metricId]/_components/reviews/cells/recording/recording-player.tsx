interface RecordingPlayerProps {
  url: string | null;
}

export function RecordingPlayer({ url }: RecordingPlayerProps) {
  if (!url) {
    return (
      <span className="flex-1 text-xs text-muted-foreground">No recording</span>
    );
  }

  return (
    <audio
      controls
      preload="none"
      src={url}
      aria-label="Recording"
      className="h-10 min-w-0 flex-1"
    />
  );
}
