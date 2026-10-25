'use client';

import { useParams } from 'next/navigation';

export const useShareToken = () => useParams<{ token: string }>().token;
