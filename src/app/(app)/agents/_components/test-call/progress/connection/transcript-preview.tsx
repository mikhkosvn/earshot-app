import type { TestTranscriptLine } from '@/server/agents/types';

type TranscriptPreviewProps = {
  lines: TestTranscriptLine[];
};

export function TranscriptPreview({ lines }: TranscriptPreviewProps) {
  if (lines.length === 0) return null;

  return (
    <div className="flex flex-col gap-1 border-t pt-2 text-xs">
      <p className="font-medium">Transcript</p>
      {lines.map((line, index) => (
        <p key={index}>
          <span className="font-mono text-muted-foreground">{line.time}</span>{' '}
          <span className="font-medium">{line.role}:</span> {line.content}
        </p>
      ))}
    </div>
  );
}
