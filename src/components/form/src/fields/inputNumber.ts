import { NInputNumber } from 'naive-ui';
import type { RenderFnParams } from '../types';

export function renderInputNumber({ item, model }: RenderFnParams) {
  const { props = undefined, field } = item;
  return () =>
    h(NInputNumber, {
      ...props,
      value: model[field],
      clearable: true,
      onUpdateValue: (v: number) => (model[field] = v)
    });
}
