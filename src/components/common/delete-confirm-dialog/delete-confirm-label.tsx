interface DeleteConfirmLabelProps {
  isPending: boolean;
}

export function DeleteConfirmLabel({ isPending }: DeleteConfirmLabelProps) {
  if (isPending) return 'Deleting...';
  return 'Delete';
}
