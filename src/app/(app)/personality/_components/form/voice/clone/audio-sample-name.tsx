type AudioSampleNameProps = {
  file: File | null;
};

export function AudioSampleName({ file }: AudioSampleNameProps) {
  if (!file) return null;
  return <p className="font-mono text-foreground">{file.name}</p>;
}
