import type { RenderFnParams } from '../types';
import GpMonacoEditor from '@/components/simple-comp/GpMonacoEditor.vue';
import { useDeps } from '../utils';
import { omit } from 'lodash-unified';

export function renderMonacoEditor({ item, model }: RenderFnParams) {
  const { props = undefined, field } = item;

  const state = useDeps({ item, model });

  // 这里一定要返回一个函数，否则响应式会丢失
  return () =>
    h(GpMonacoEditor, {
      clearable: true,
      value: model[field],
      onUpdateValue: (value: string) => void (model[field] = value),
      ...state,
      ...omit(props, 'value', 'onUpdateValue'),
    });
}
