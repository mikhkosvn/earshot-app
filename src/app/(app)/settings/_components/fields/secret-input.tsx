'use client';

import { useState, type ComponentProps } from 'react';

import { secretInputType } from '@/app/(app)/settings/_utils/secret-input-type';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { cn } from '@/lib/utils';

import { SecretVisibilityIcon } from './secret-visibility-icon';

type SecretInputProps = Omit<ComponentProps<'input'>, 'type'>;

export function SecretInput({ className, ...props }: SecretInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <InputGroup className={cn('bg-background', className)}>
      <InputGroupInput
        {...props}
        type={secretInputType(isVisible)}
        autoComplete="off"
        spellCheck={false}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          aria-label="Show or hide the value"
          aria-pressed={isVisible}
          onClick={() => setIsVisible((visible) => !visible)}
        >
          <SecretVisibilityIcon isVisible={isVisible} />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
