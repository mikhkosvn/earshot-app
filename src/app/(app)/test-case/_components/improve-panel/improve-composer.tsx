'use client';

import { ArrowUpIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type ImproveComposerProps = {
  onSend: (prompt: string) => void;
  isPending: boolean;
};

export function ImproveComposer({ onSend, isPending }: ImproveComposerProps) {
  const [prompt, setPrompt] = useState('');
  const submit = () => {
    if (!prompt.trim() || isPending) return;
    onSend(prompt);
    setPrompt('');
  };

  return (
    <form
      className="relative border-t p-3"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <Textarea
        value={prompt}
        placeholder="Describe how to improve these evaluators…"
        aria-label="Describe how to improve these evaluators"
        className="min-h-20 resize-none pr-12"
        onChange={(event) => setPrompt(event.target.value)}
        onKeyDown={(event) => {
          if (event.key !== 'Enter' || event.shiftKey) return;
          event.preventDefault();
          submit();
        }}
      />
      <Button
        type="submit"
        size="icon-sm"
        aria-label="Send (Enter) · New line (Shift+Enter)"
        disabled={!prompt.trim() || isPending}
        className="absolute right-5 bottom-5 rounded-full"
      >
        <ArrowUpIcon />
      </Button>
    </form>
  );
}
