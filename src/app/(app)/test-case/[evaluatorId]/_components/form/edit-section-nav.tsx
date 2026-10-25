import { Fragment } from 'react';

import { EDIT_SECTIONS } from '../../_constants/edit-section-id';

export function EditSectionNav() {
  return (
    <nav
      aria-label="Sections"
      className="flex items-center gap-3 border-b bg-muted/30 px-4 py-3"
    >
      {EDIT_SECTIONS.map((section, index) => (
        <Fragment key={section.id}>
          <a
            href={`#${section.id}`}
            className="flex shrink-0 items-center gap-2 text-sm hover:underline"
          >
            <span className="flex size-6 items-center justify-center rounded-full border text-xs font-semibold">
              {index + 1}
            </span>
            {section.label}
          </a>
          <span aria-hidden className="h-0.5 flex-1 bg-border last:hidden" />
        </Fragment>
      ))}
    </nav>
  );
}
