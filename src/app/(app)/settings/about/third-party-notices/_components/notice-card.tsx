import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { ThirdPartyNotice } from '@/server/third-party-notices/types';

import { NoticeLicenseBody } from './notice-license-body';
import { NoticeSourceBody } from './notice-source-body';

const NoticeSection = {
  license: 'license',
  source: 'source',
} as const;

type NoticeCardProps = {
  notice: ThirdPartyNotice;
};

export function NoticeCard({ notice }: NoticeCardProps) {
  return (
    <section className="flex flex-col gap-2 rounded-lg border bg-background px-4 pt-3 pb-1">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-sm font-semibold">
          {notice.name} v{notice.version}
        </h2>
        <p className="text-xs text-muted-foreground">
          {notice.copyright ?? `License: ${notice.license}`}
        </p>
      </div>
      <Accordion multiple>
        <AccordionItem value={NoticeSection.license}>
          <AccordionTrigger className="text-xs">License</AccordionTrigger>
          <AccordionContent>
            <NoticeLicenseBody notice={notice} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={NoticeSection.source}>
          <AccordionTrigger className="text-xs">Source</AccordionTrigger>
          <AccordionContent>
            <NoticeSourceBody repositoryUrl={notice.repositoryUrl} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
