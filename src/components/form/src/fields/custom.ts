import type { RenderFnParams } from '../types';
import { omit } from 'lodash-unified';

export function renderCustom({ item, model }: RenderFnParams) {
  const { props = undefined, field, component } = item;

  // 这里一定要返回一个函数，否则响应式会丢失
  return component;
}
