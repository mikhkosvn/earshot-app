import { RecordingFileItem } from './recording-file-item';

interface RecordingFileListProps {
  files: readonly File[];
  onRemove: (index: number) => void;
}

export function RecordingFileList({ files, onRemove }: RecordingFileListProps) {
  if (files.length === 0) return null;

  return (
    <ul className="flex flex-col gap-1.5">
      {files.map((file, index) => (
        <RecordingFileItem
          key={`${file.name}-${index}`}
          file={file}
          onRemove={() => onRemove(index)}
        />
      ))}
    </ul>
  );
}
