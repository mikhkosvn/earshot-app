'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';

import { EvaluatorService } from '../../../_service';

type TagSuggestionsProps = {
  isOpen: boolean;
  draft: string;
  selected: string[];
  onPick: (tag: string) => void;
};

export function TagSuggestions({
  isOpen,
  draft,
  selected,
  onPick,
}: TagSuggestionsProps) {
  const projectId = useCurrentProjectId();
  const { data: tags } = useSuspenseQuery(
    EvaluatorService.getTagsQuery({ projectId }),
  );
  const needle = draft.trim().toLowerCase();
  const suggestions = tags.filter(
    (tag) => !selected.includes(tag) && tag.toLowerCase().includes(needle),
  );

  if (!isOpen || suggestions.length === 0) return null;

  return (
    <div
      role="listbox"
      aria-label="Existing tags"
      className="absolute top-full z-50 mt-1 flex max-h-48 w-full flex-col overflow-y-auto rounded-lg border bg-popover p-1 shadow-md"
    >
      {suggestions.map((tag) => (
        <Button
          key={tag}
          type="button"
          role="option"
          aria-selected={false}
          variant="ghost"
          size="sm"
          className="justify-start font-normal"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onPick(tag)}
        >
          {tag}
        </Button>
      ))}
    </div>
  );
}
