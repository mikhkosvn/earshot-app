import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Language } from '@/generated/prisma/enums';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

type PersonalityBreadcrumbProps = {
  current: string;
};

export function PersonalityBreadcrumb({ current }: PersonalityBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            render={
              <Link
                href={UrlGenerator.personality({
                  values: { language: Language.en },
                })}
              />
            }
          >
            Personalities
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
