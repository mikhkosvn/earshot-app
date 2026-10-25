type KnowledgeSaveLabelProps = {
  isSaving: boolean;
};

export function KnowledgeSaveLabel({ isSaving }: KnowledgeSaveLabelProps) {
  if (isSaving) return 'Saving...';
  return 'Save instructions';
}
