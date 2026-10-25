type UploadErrorTextProps = {
  error: string | null;
};

export function UploadErrorText({ error }: UploadErrorTextProps) {
  if (!error) return null;
  return (
    <p role="alert" className="text-destructive">
      {error}
    </p>
  );
}
