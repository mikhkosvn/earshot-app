import { Suspense } from 'react';

import { ShareData } from './_components/share-data';
import { SharePageSkeleton } from './_components/share-page-skeleton';
import { ShareTopBar } from './_components/share-top-bar';

export default function SharePage({
  params,
  searchParams,
}: PageProps<'/share/[token]'>) {
  return (
    <main className="flex min-h-dvh flex-1 flex-col bg-gray-50 dark:bg-neutral-900">
      <ShareTopBar />
      <Suspense fallback={<SharePageSkeleton />}>
        <ShareData params={params} searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
