type GuideExampleLabelProps = {
  label?: string;
};

export function GuideExampleLabel({ label }: GuideExampleLabelProps) {
  if (!label) return null;

  return <span className="font-semibold">{label} - </span>;
}
