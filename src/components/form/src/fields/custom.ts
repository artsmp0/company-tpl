import type { Component } from 'vue';
import type { RenderFnParams } from '../types';
import { omit } from 'lodash-unified';
import { useDeps } from '../utils';

export function renderCustom({ item, model }: RenderFnParams) {
  const { props = undefined, field, component } = item;
  const state = useDeps({ item, model });
  return () =>
    h(component as Component, {
      value: model[field],
      onUpdateValue: (value: string) => void (model[field] = value),
      'onUpdate:value': (value: string) => {
        void (model[field] = value);
      },
      ...state,
      ...omit(props, ['value', 'onUpdateValue']),
    });
}
