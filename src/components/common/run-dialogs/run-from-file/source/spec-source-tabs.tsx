'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { SpecSource } from '../../_constants/spec-source';
import type { RunFromFileForm } from '../../_hooks/use-run-from-file-form';
import { SpecFileDropZone } from './spec-file-drop-zone';
import { SpecPasteField } from './spec-paste-field';

type SpecSourceTabsProps = {
  form: RunFromFileForm;
};

export function SpecSourceTabs({ form }: SpecSourceTabsProps) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-sm font-medium">Test suite file</h2>
      <Tabs defaultValue={SpecSource.upload}>
        <TabsList>
          <TabsTrigger value={SpecSource.upload}>Upload file</TabsTrigger>
          <TabsTrigger value={SpecSource.paste}>Paste JSON</TabsTrigger>
        </TabsList>
        <TabsContent value={SpecSource.upload}>
          <SpecFileDropZone form={form} />
        </TabsContent>
        <TabsContent value={SpecSource.paste}>
          <SpecPasteField control={form.control} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
