import { NInputNumber } from 'naive-ui';
import type { RenderFnParams } from '../types';
import { useDeps } from '../utils';
import { omit } from 'lodash-unified';

export function renderInputNumber({ item, model }: RenderFnParams) {
  const { props = undefined, field } = item;
  const state = useDeps({ item, model });
  return () =>
    // @ts-ignore
    h(NInputNumber, {
      value: model[field],
      clearable: true,
      onUpdateValue: (v: number) => (model[field] = v),
      ...state,
      ...omit(props, ['value', 'onUpdateValue']),
    });
}
