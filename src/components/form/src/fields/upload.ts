import { GpUpload } from '@/components';
import type { RenderFnParams } from '../types';
import { omit } from 'lodash-unified';

export function renderUpload({ item, model }: RenderFnParams) {
  const { props = undefined, field } = item;

  return () =>
    h(GpUpload, {
      value: model[field],
      onUpdateValue: (value: string) => void (model[field] = value),
      ...omit(props, ['value', 'onUpdateValue'])
    });
}
