import { NSelect } from 'naive-ui';
import type { RenderFnParams } from '../types';
import { tryOnMounted } from '@vueuse/core';
import { omit } from 'lodash-unified';

export function renderSelect({ item, model }: RenderFnParams) {
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
      value: model[field],
      onUpdateValue: (v: string) => (model[field] = v),
      clearable: true,
      loading: loading.value,
      options: options.value,
      filterable: true,
      ...omit(props, ['value', 'onUpdateValue'])
    });
}
