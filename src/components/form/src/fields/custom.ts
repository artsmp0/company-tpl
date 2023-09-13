import type { RenderFnParams } from '../types';

export function renderCustom({ item, model }: RenderFnParams) {
  const { props = undefined, field, component } = item;
  // 一般用来在表单后面新增按钮之类的操作
  return component;
}
