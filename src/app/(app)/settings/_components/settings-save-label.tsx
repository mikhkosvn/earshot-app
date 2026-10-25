interface SettingsSaveLabelProps {
  isSaving: boolean;
}

export function SettingsSaveLabel({ isSaving }: SettingsSaveLabelProps) {
  if (isSaving) return 'Saving...';
  return 'Save Changes';
}
