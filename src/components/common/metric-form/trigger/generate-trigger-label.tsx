type GenerateTriggerLabelProps = {
  isGenerating: boolean;
};

export function GenerateTriggerLabel({
  isGenerating,
}: GenerateTriggerLabelProps) {
  if (isGenerating) return 'Generating...';
  return 'Generate';
}
