'use client';

import { BodyVariableBar } from '../variables/body-variable-bar';
import { AudioField } from './audio-field';
import { CustomCodeField } from './custom-code-field';
import { DescriptionField } from './description-field';

export function MetricBodyFields() {
  return (
    <>
      <AudioField />
      <div className="flex flex-col gap-2">
        <DescriptionField />
        <CustomCodeField />
        <BodyVariableBar />
      </div>
    </>
  );
}
