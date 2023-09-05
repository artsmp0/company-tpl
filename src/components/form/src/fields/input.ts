import { NInput } from 'naive-ui';
import type { RenderFnParams } from '../types';
import { omit } from 'lodash-unified';

export function renderInput({ item, model }: RenderFnParams) {
  const { props = undefined, field } = item;

  // 这里一定要返回一个函数，否则响应式会丢失
  return () =>
    h(NInput, {
      clearable: true,
      value: model[field],
      onUpdateValue: (value: string) => void (model[field] = value),
      ...omit(props, ['value', 'onUpdateValue'])
    });
}
