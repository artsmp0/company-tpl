import type { RenderFnParams } from '../types';
import GpMonacoEditor from '@/components/simple-comp/GpMonacoEditor.vue';

export function renderMonacoEditor({ item, model }: RenderFnParams) {
  const { props = undefined, field } = item;

  // 这里一定要返回一个函数，否则响应式会丢失
  return () =>
    h(GpMonacoEditor, {
      clearable: true,
      value: model[field],
      onUpdateValue: (value: string) => void (model[field] = value),
      options: props
    });
}
