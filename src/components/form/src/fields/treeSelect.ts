import { NTreeSelect } from 'naive-ui';
import type { RenderFnParams } from '../types';
import { tryOnMounted } from '@vueuse/core';

export function renderTreeSelect({ item, model }: RenderFnParams) {
  const { props = undefined, field, apiFn } = item;
  const options = shallowRef([]);
  const loading = ref(false);
  if (apiFn) {
    tryOnMounted(async () => {
      loading.value = true;
      const res = await apiFn();
      options.value = res;
      loading.value = false;
    });
  }
  return () =>
    h(NTreeSelect, {
      value: model[field],
      onUpdateValue(v: any) {
        model[field] = v;
      },
      loading: loading.value,
      options: options.value,
      clearable: true,
      ...props
    });
}
