'use client';

import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useConfigurationsQuery } from '../../../_hooks/use-configurations-query';
import { useApplyConfiguration } from '../../../_hooks/use-apply-configuration';
import { NoConfigurationsItem } from './no-configurations-item';

export function SelectConfigurationMenu() {
  const { data: configurations } = useConfigurationsQuery();
  const applyConfiguration = useApplyConfiguration();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="sm" className="text-xs" />}
      >
        Select dashboard
        <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <NoConfigurationsItem count={configurations.length} />
        {configurations.map((configuration) => (
          <DropdownMenuItem
            key={configuration.id}
            className="text-xs"
            onClick={() => applyConfiguration(configuration)}
          >
            {configuration.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
