'use client';

import { ArrowUpIcon } from 'lucide-react';
import { useState } from 'react';

import { useAnswerAssistantMutation } from '@/app/(app)/test-case/_hooks/mutations/generation/use-answer-assistant-mutation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import type { GenerationSessionView } from '@/server/evaluator-generation/types';

interface QuestionComposerProps {
  session: GenerationSessionView;
}

export function QuestionComposer({ session }: QuestionComposerProps) {
  const [answer, setAnswer] = useState('');
  const answerAssistant = useAnswerAssistantMutation();
  const questions = session.assistantJob?.result?.clarificationQuestions ?? [];
  const question = questions[0]?.question ?? '';
  const send = (skipped: boolean) =>
    answerAssistant.mutate({ sessionId: session.id, answer, skipped });

  return (
    <div className="flex flex-col gap-2 border-t p-3">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-semibold tracking-wide whitespace-nowrap text-muted-foreground uppercase">
          Question 1 of {Math.max(questions.length, 1)}
        </span>
        <Progress
          value={100}
          aria-label="Question progress"
          className="flex-1"
        />
        <Button
          type="button"
          variant="ghost"
          size="xs"
          disabled={answerAssistant.isPending}
          onClick={() => send(true)}
        >
          Skip
        </Button>
      </div>
      <p className="text-sm">{question}</p>
      <form
        className="relative"
        onSubmit={(event) => {
          event.preventDefault();
          if (answer.trim()) send(false);
        }}
      >
        <Textarea
          value={answer}
          placeholder="Type your answer..."
          aria-label="Your answer"
          className="min-h-20 resize-none pr-12"
          onChange={(event) => setAnswer(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== 'Enter' || event.shiftKey) return;
            event.preventDefault();
            if (answer.trim()) send(false);
          }}
        />
        <Button
          type="submit"
          size="icon-sm"
          aria-label="Send answer"
          disabled={!answer.trim() || answerAssistant.isPending}
          className="absolute right-2 bottom-2 rounded-full"
        >
          <ArrowUpIcon />
        </Button>
      </form>
    </div>
  );
}
