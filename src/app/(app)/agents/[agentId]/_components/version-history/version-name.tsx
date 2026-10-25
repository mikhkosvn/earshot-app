interface VersionNameProps {
  name: string | null;
}

export function VersionName({ name }: VersionNameProps) {
  if (!name) return null;
  return <p className="font-medium">{name}</p>;
}
