import { NRadio, NRadioButton, NRadioGroup, NSpace } from 'naive-ui';
import type { RenderFnParams } from '../types';
import { omit } from 'lodash-unified';

export function renderRadio({ item, model }: RenderFnParams) {
  const { props = undefined, field, button } = item;
  if (!props.options) {
    console.warn('radio options must required!');
  }
  const children = button
    ? item.props.options.map((o: any) =>
        h(
          NRadioButton,
          {
            value: o.value,
            key: o.value
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
              key: o.value
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
        ...omit(item.props, ['options', 'value', 'onUpdateValue'])
      },
      () => children
    );
}
