'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { type ConversationQueryArgs, ConversationService } from '../_service';

export const useConversation = (args: ConversationQueryArgs) =>
  useSuspenseQuery(ConversationService.getConversationQuery(args)).data;
