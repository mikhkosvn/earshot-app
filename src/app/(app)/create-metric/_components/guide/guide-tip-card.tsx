import type { GuideTip } from '../../_constants/guide-tips';
import { GuideExampleBox } from './guide-example-box';

type GuideTipCardProps = {
  tip: GuideTip;
};

export function GuideTipCard({ tip }: GuideTipCardProps) {
  return (
    <section className="flex flex-col gap-2 rounded-lg bg-muted/40 p-3">
      <h4 className="text-sm font-semibold">{tip.title}</h4>
      <p className="text-sm text-muted-foreground">{tip.text}</p>
      <GuideExampleBox examples={tip.examples} />
    </section>
  );
}
