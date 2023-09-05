import { NDatePicker } from 'naive-ui';
import type { RenderFnParams } from '../types';
import { omit } from 'lodash-unified';

export function renderDatePicker({ item, model }: RenderFnParams) {
  const { props = undefined, field } = item;

  return () =>
    h(NDatePicker, {
      clearable: true,
      formattedValue: model[field],
      onUpdateFormattedValue: (value: string) => void (model[field] = value),
      style: { width: '100%' },
      ...omit(props, ['formattedValue', 'onUpdateFormattedValue'])
    });
}
