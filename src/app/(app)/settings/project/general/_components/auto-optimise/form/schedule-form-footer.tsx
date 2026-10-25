import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

type ScheduleFormFooterProps = {
  isSaving: boolean;
  submitLabel: string;
};

export function ScheduleFormFooter({
  isSaving,
  submitLabel,
}: ScheduleFormFooterProps) {
  return (
    <div className="flex justify-end gap-2 border-t p-4">
      <DialogClose render={<Button type="button" variant="outline" />}>
        Cancel
      </DialogClose>
      <Button type="submit" disabled={isSaving}>
        {submitLabel}
      </Button>
    </div>
  );
}
