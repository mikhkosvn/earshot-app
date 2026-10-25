'use client';

import Link from 'next/link';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

interface EvaluatorsBreadcrumbProps {
  current: string;
}

export function EvaluatorsBreadcrumb({ current }: EvaluatorsBreadcrumbProps) {
  const projectId = useCurrentProjectId();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            render={
              <Link
                href={UrlGenerator.evaluators({
                  values: { project: projectId },
                })}
              />
            }
          >
            Evaluators
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
