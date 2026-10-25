type WaveformCursorProps = {
  percent: number;
};

export function WaveformCursor({ percent }: WaveformCursorProps) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 w-px bg-foreground"
      style={{ left: `${percent}%` }}
    />
  );
}
