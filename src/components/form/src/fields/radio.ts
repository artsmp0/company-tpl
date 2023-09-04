import { NRadio, NRadioButton, NRadioGroup, NSpace } from 'naive-ui';
import type { RenderFnParams } from '../types';

export function renderRadio({ item, model }: RenderFnParams) {
  const { props = undefined, field, button } = item;
  if (!props.options) {
    console.warn('radio options must required!');
  }
  return () =>
    h(
      NRadioGroup,
      {
        ...item.props,
        value: model[field],
        onUpdateValue: (v: any) => (model[field] = v)
      },
      button
        ? item.props.options.map((o: any) =>
            h(
              NRadioButton,
              {
                value: o.value,
                key: o.value
              },
              o.label
            )
          )
        : h(
            NSpace,
            null,
            item.props.options.map((o: any) =>
              h(
                NRadio,
                {
                  value: o.value,
                  key: o.value
                },
                o.label
              )
            )
          )
    );
}
