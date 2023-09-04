import { NSelect } from 'naive-ui';
import type { RenderFnParams } from '../types';
import { tryOnMounted } from '@vueuse/core';

export function renderApiSelect({ item, model }: RenderFnParams) {
  const { props = undefined, field, apiFn } = item;
  const loading = ref(false);
  const options = shallowRef([]);
  if (apiFn) {
    tryOnMounted(async () => {
      loading.value = true;
      const res = await apiFn();
      loading.value = false;
      options.value = res;
    });
  }
  return () =>
    h(NSelect, {
      ...props,
      value: model[field],
      clearable: true,
      loading: loading.value,
      options: options.value,
      filterable: true,
      onUpdateValue: (v: string) => (model[field] = v)
    });
}
