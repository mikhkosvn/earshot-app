'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { projectKnowledgeContentSchema } from '@/server/project-knowledge/schemas';
import type { ProjectKnowledgeFormValues } from '@/server/project-knowledge/types';

import { KnowledgeService } from '../_service';
import { useSaveKnowledgeMutation } from './mutations/use-save-knowledge-mutation';

export const useKnowledgeForm = () => {
  const projectId = useCurrentProjectId();
  const { data: knowledge } = useSuspenseQuery(
    KnowledgeService.getKnowledgeQuery({ projectId }),
  );
  const form = useForm<ProjectKnowledgeFormValues>({
    resolver: zodResolver(projectKnowledgeContentSchema),
    defaultValues: { content: knowledge.content },
  });
  const saveKnowledge = useSaveKnowledgeMutation();

  const onSubmit = form.handleSubmit((values) =>
    saveKnowledge.mutate(
      { projectId, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          form.reset(values);
        },
      },
    ),
  );

  return { form, onSubmit };
};
