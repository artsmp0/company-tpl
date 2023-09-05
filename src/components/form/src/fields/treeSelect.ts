import { NTreeSelect } from 'naive-ui';
import type { RenderFnParams } from '../types';
import { useFetchField } from '../utils';

export function renderTreeSelect({ item, model }: RenderFnParams) {
  const { props = undefined, field, apiFn } = item;
  const fetchRes = useFetchField(apiFn);

  return () =>
    h(NTreeSelect, {
      value: model[field],
      onUpdateValue(v: any) {
        model[field] = v;
      },
      loading: fetchRes?.loading.value,
      options: fetchRes?.options.value,
      clearable: true,
      ...props
    });
}
