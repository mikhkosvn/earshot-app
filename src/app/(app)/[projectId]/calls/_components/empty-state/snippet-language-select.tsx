'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  SNIPPET_LANGUAGE_ITEMS,
  SnippetLanguage,
} from '../../_constants/call-providers';

export function SnippetLanguageSelect() {
  return (
    <Select
      items={SNIPPET_LANGUAGE_ITEMS}
      defaultValue={SnippetLanguage.python}
    >
      <SelectTrigger
        size="sm"
        aria-label="Language"
        className="w-28 bg-background text-xs"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SNIPPET_LANGUAGE_ITEMS.map((item) => (
          <SelectItem key={item.value} value={item.value} className="text-xs">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
