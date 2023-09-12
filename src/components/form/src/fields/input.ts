import { NInput } from 'naive-ui';
import type { RenderFnParams } from '../types';
import { omit } from 'lodash-unified';
import { useDeps } from '../utils';

export function renderInput({ item, model }: RenderFnParams) {
  const { props = undefined, field } = item;
  const state = useDeps({ item, model });

  // 这里一定要返回一个函数，否则响应式会丢失
  return () =>
    h(NInput, {
      clearable: true,
      value: model[field],
      onUpdateValue: (value: string) => void (model[field] = value),
      ...state,
      ...omit(props, ['value', 'onUpdateValue']),
    });
}
