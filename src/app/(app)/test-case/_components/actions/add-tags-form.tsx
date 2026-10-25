'use client';

import { useState } from 'react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';

import { useAddEvaluatorTagsMutation } from '../../_hooks/mutations/evaluator-actions/use-add-evaluator-tags-mutation';
import { TagInput } from '../fields/tag-input/tag-input';

interface AddTagsFormProps {
  evaluatorIds: number[];
  onDone: () => void;
}

export function AddTagsForm({ evaluatorIds, onDone }: AddTagsFormProps) {
  const projectId = useCurrentProjectId();
  const [tags, setTags] = useState<string[]>([]);
  const addTags = useAddEvaluatorTagsMutation();

  return (
    <div className="flex flex-col gap-4">
      <TagInput value={tags} onValueChange={setTags} />
      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>
          Close
        </DialogClose>
        <Button
          type="button"
          disabled={tags.length === 0 || addTags.isPending}
          onClick={() =>
            addTags.mutate(
              { projectId, evaluatorIds, tags },
              {
                onSuccess: (result) => {
                  if (!result.ok) return;
                  onDone();
                },
              },
            )
          }
        >
          Add Tags
        </Button>
      </DialogFooter>
    </div>
  );
}
