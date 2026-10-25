'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError } from '@/components/ui/field';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import type { ProjectKnowledgeFormValues } from '@/server/project-knowledge/types';

import {
  KNOWLEDGE_PLACEHOLDER,
  KnowledgeTab,
} from '../_constants/markdown-kinds';
import { KnowledgePreview } from './knowledge-preview';

export function KnowledgeEditor() {
  const { control } = useFormContext<ProjectKnowledgeFormValues>();

  return (
    <section className="rounded-lg border bg-background p-4">
      <Tabs defaultValue={KnowledgeTab.write} className="gap-3">
        <TabsList>
          <TabsTrigger value={KnowledgeTab.write}>Write</TabsTrigger>
          <TabsTrigger value={KnowledgeTab.preview}>Preview</TabsTrigger>
        </TabsList>
        <TabsContent value={KnowledgeTab.write}>
          <Controller
            name="content"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Textarea
                  {...field}
                  aria-label="Agent knowledge instructions"
                  placeholder={KNOWLEDGE_PLACEHOLDER}
                  spellCheck={false}
                  aria-invalid={fieldState.invalid}
                  className="min-h-100 resize-y font-mono text-xs/relaxed md:text-xs"
                />
                <FieldError errors={[fieldState.error]} className="text-xs" />
              </Field>
            )}
          />
        </TabsContent>
        <TabsContent value={KnowledgeTab.preview}>
          <KnowledgePreview />
        </TabsContent>
      </Tabs>
    </section>
  );
}
