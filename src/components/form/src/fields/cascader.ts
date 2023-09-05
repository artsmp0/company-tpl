import { NCascader, NSpin } from 'naive-ui';
import type { RenderFnParams } from '../types';
import { omit } from 'lodash-unified';
import { useFetchField } from '../utils';

export function renderCascader({ item, model }: RenderFnParams) {
  const { props = undefined, field, apiFn } = item;

  const fetchRes = useFetchField(apiFn);

  return () =>
    h(
      NCascader,
      {
        clearable: true,
        maxTagCount: 'responsive',
        options: fetchRes?.options.value,
        value: model[field],
        onUpdateValue: (value: string) => void (model[field] = value),
        ...omit(props, ['value', 'onUpdateValue'])
      },
      {
        arrow: () =>
          fetchRes?.loading.value
            ? h(NSpin, {
                size: 12
              })
            : undefined
      }
    );
}
