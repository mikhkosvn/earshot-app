import type { UseFormReturn } from 'react-hook-form';

import {
  MetricEvalType,
  WidgetField,
  WidgetTimePeriod,
} from '@/generated/prisma/enums';
import { WidgetFieldLabel } from '@/server/dashboards/constants/labels/widget-field-labels';
import {
  allowedAggregations,
  defaultAggregation,
  fieldValueKind,
  KIND_DEFAULT_DISPLAY_TYPE,
  KIND_DISPLAY_TYPES,
} from '@/server/dashboards/constants/plot/field-value-kind';
import { MetadataFieldType } from '@/server/dashboards/constants/plot/metadata-field-type';
import {
  PlotDisplayType,
  TIME_SERIES_DISPLAY_TYPES,
} from '@/server/dashboards/constants/plot/plot-display-type';
import { WidgetGroupBy } from '@/server/dashboards/constants/plot/widget-group-by';
import type { PlotMetricOption } from '@/server/dashboards/types';

import type { PlotFormValues } from '../_schemas/plot-form-schema';

type PlotForm = UseFormReturn<PlotFormValues>;

const metricOf = (
  metrics: readonly PlotMetricOption[],
  metricId: number | null,
) => metrics.find((metric) => metric.id === metricId);

export const plotKindOf = (
  values: Pick<PlotFormValues, 'field' | 'metricId' | 'metadataFieldType'>,
  metrics: readonly PlotMetricOption[],
) => {
  const metric = metricOf(metrics, values.metricId);
  return {
    kind: fieldValueKind({
      field: values.field ?? WidgetField.duration,
      metricEvalType: metric?.evalType ?? null,
      metadataFieldType: values.metadataFieldType,
    }),
    isRating: metric?.evalType === MetricEvalType.continuous_qualitative,
  };
};

const setName = (form: PlotForm, name: string) => {
  if (form.getFieldState('name').isDirty) return;
  form.setValue('name', name, { shouldValidate: name !== '' });
};

const fieldName = (field: WidgetField) => {
  if (field === WidgetField.metric_value) return '';
  return WidgetFieldLabel[field];
};

const syncShape = (
  form: PlotForm,
  metrics: readonly PlotMetricOption[],
  resetDisplay: boolean,
) => {
  const values = form.getValues();
  const { kind, isRating } = plotKindOf(values, metrics);
  if (resetDisplay || !KIND_DISPLAY_TYPES[kind].includes(values.displayType)) {
    form.setValue('displayType', KIND_DEFAULT_DISPLAY_TYPE[kind]);
  }
  const aggregations = allowedAggregations(kind, isRating);
  if (!values.aggregation || !aggregations.includes(values.aggregation)) {
    form.setValue('aggregation', defaultAggregation(kind));
  }
};

const metadataTypeFor = (field: WidgetField, form: PlotForm) => {
  if (field !== WidgetField.metadata) return null;
  return form.getValues('metadataFieldType') ?? MetadataFieldType.string;
};

export const changePlotField = (
  form: PlotForm,
  field: WidgetField,
  metrics: readonly PlotMetricOption[],
) => {
  form.setValue('field', field, { shouldValidate: true });
  form.setValue('metricId', null);
  form.setValue('metadataKey', null);
  form.setValue('metadataFieldType', metadataTypeFor(field, form));
  form.setValue('groupBy', WidgetGroupBy.none);
  form.setValue('groupByMetadataKey', null);
  setName(form, fieldName(field));
  syncShape(form, metrics, true);
};

export const changePlotMetric = (
  form: PlotForm,
  metricId: number,
  metrics: readonly PlotMetricOption[],
) => {
  form.setValue('metricId', metricId, { shouldValidate: true });
  setName(form, metricOf(metrics, metricId)?.name ?? '');
  syncShape(form, metrics, false);
};

export const changeMetadataType = (
  form: PlotForm,
  type: MetadataFieldType,
  metrics: readonly PlotMetricOption[],
) => {
  form.setValue('metadataFieldType', type);
  syncShape(form, metrics, false);
};

export const changeDisplayType = (
  form: PlotForm,
  displayType: PlotDisplayType,
  metrics: readonly PlotMetricOption[],
) => {
  form.setValue('displayType', displayType);
  if (!TIME_SERIES_DISPLAY_TYPES.includes(displayType)) return;
  if (form.getValues('timePeriod') === null) {
    form.setValue('timePeriod', WidgetTimePeriod.day);
  }
  syncShape(form, metrics, false);
};
