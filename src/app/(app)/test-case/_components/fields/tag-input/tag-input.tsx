'use client';

import { useState } from 'react';

import { Input } from '@/components/ui/input';

import { TagChip } from './tag-chip';
import { TagSuggestions } from './tag-suggestions';

type TagInputProps = {
  id?: string;
  value: string[];
  onValueChange: (tags: string[]) => void;
};

const addTag = (tags: string[], tag: string) => {
  const trimmed = tag.trim();
  if (!trimmed || tags.includes(trimmed)) return tags;
  return [...tags, trimmed];
};

export function TagInput({ id, value, onValueChange }: TagInputProps) {
  const [draft, setDraft] = useState('');
  const [isFocused, setFocused] = useState(false);
  const commit = (tag: string) => {
    onValueChange(addTag(value, tag));
    setDraft('');
  };

  return (
    <div className="relative flex flex-col gap-1.5">
      <div className="flex min-h-8 flex-wrap items-center gap-1 rounded-lg border bg-background px-1.5 py-1">
        {value.map((tag) => (
          <TagChip
            key={tag}
            tag={tag}
            onRemove={() => onValueChange(value.filter((item) => item !== tag))}
          />
        ))}
        <Input
          id={id}
          value={draft}
          placeholder="Create tags..."
          aria-label="Create tags"
          className="h-6 min-w-32 flex-1 border-0 px-1 shadow-none focus-visible:ring-0 dark:bg-transparent"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== 'Enter') return;
            event.preventDefault();
            commit(draft);
          }}
        />
      </div>
      <TagSuggestions
        isOpen={isFocused}
        draft={draft}
        selected={value}
        onPick={commit}
      />
    </div>
  );
}
