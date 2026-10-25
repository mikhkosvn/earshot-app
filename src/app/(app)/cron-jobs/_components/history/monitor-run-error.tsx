type MonitorRunErrorProps = {
  errorMessage: string | null;
};

export function MonitorRunError({ errorMessage }: MonitorRunErrorProps) {
  if (!errorMessage) return null;

  return <p className="text-[11px] text-destructive">{errorMessage}</p>;
}
