/* eslint-disable @typescript-eslint/no-explicit-any */
import { NRadio, NRadioButton, NRadioGroup, NSpace } from 'naive-ui';
import type { RenderFnParams } from '../types';
import { omit } from 'lodash-unified';
import { useDeps } from '../utils';

export function renderRadio({ item, model }: RenderFnParams) {
  const { props = undefined, field, button } = item;
  if (!props.options) {
    console.warn('radio options must be required!');
  }
  const state = useDeps({ item, model });
  const children = button
    ? item.props.options.map((o: any) =>
        h(
          NRadioButton,
          {
            value: o.value,
            key: o.value,
          },
          () => o.label
        )
      )
    : h(NSpace, null, () =>
        item.props.options.map((o: any) =>
          h(
            NRadio,
            {
              value: o.value,
              key: o.value,
            },
            () => o.label
          )
        )
      );
  return () =>
    h(
      NRadioGroup,
      {
        value: model[field],
        onUpdateValue: (v: any) => (model[field] = v),
        ...state,
        ...omit(item.props, ['options', 'value', 'onUpdateValue']),
      },
      () => children
    );
}
