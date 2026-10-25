import { io } from 'next/cache';
import { redirect } from 'next/navigation';

import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { getCurrentProjectIdAction } from '@/server/projects/actions';

export async function RootRedirect() {
  await io();

  const projectId = await getCurrentProjectIdAction();
  return redirect(UrlGenerator.agents({ values: { project: projectId } }));
}
