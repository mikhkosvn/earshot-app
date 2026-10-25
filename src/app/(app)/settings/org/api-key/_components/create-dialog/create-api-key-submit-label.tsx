type CreateApiKeySubmitLabelProps = {
  isPending: boolean;
};

export function CreateApiKeySubmitLabel({
  isPending,
}: CreateApiKeySubmitLabelProps) {
  if (isPending) return 'Creating...';
  return 'Create API Key';
}
