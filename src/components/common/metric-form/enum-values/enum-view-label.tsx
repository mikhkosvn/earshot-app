import { EnumView } from '../_constants/enum-view';

interface EnumViewLabelProps {
  view: EnumView;
}

export function EnumViewLabel({ view }: EnumViewLabelProps) {
  if (view === EnumView.json) return 'List View';
  return 'JSON View';
}
