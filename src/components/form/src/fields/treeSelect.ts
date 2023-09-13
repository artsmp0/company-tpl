import { NTreeSelect } from 'naive-ui';
import type { RenderFnParams } from '../types';
import { useDeps, useFetchField } from '../utils';
import { omit } from 'lodash-unified';

export function renderTreeSelect({ item, model }: RenderFnParams) {
  const { props = undefined, field, apiFn } = item;
  const fetchRes = useFetchField(apiFn);
  const state = useDeps({ item, model }, fetchRes);

  return () =>
    h(NTreeSelect, {
      value: model[field],
      onUpdateValue(v: any) {
        model[field] = v;
      },
      loading: fetchRes?.loading.value,
      options: fetchRes?.options.value,
      clearable: true,
      ...state,
      ...omit(props, ['value', 'onUpdateValue']),
    });
}
