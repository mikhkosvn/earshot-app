import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

export function TelephonyBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-base">
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href={UrlGenerator.settings()} />}>
            Settings
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Telephony</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
