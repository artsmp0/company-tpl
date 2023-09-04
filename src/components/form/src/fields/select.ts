import { NSelect } from 'naive-ui';
import type { RenderFnParams } from '../types';

export function renderSelect({ item, model }: RenderFnParams) {
  const { props = undefined, field } = item;
  return () =>
    h(NSelect, {
      ...props,
      value: model[field],
      clearable: true,
      onUpdateValue: (v: string) => (model[field] = v)
    });
}
