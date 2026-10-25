'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { PasswordVisibilityIcon } from './password-visibility-icon';

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  placeholder?: string;
  onBlur: () => void;
  onChange: (value: string) => void;
}

const inputType = (visible: boolean) => {
  if (visible) return 'text';
  return 'password';
};

export function PasswordInput({
  id,
  name,
  value,
  placeholder,
  onBlur,
  onChange,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        type={inputType(visible)}
        value={value}
        placeholder={placeholder}
        autoComplete="new-password"
        className="bg-background pr-8 text-xs md:text-xs"
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label="Show or hide the value"
        className="absolute top-1/2 right-1 -translate-y-1/2"
        onClick={() => setVisible((current) => !current)}
      >
        <PasswordVisibilityIcon visible={visible} />
      </Button>
    </div>
  );
}
