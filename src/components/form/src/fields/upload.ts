import { GpUpload } from '@/components';
import type { RenderFnParams } from '../types';
import { omit } from 'lodash-unified';
import { useDeps } from '../utils';

export function renderUpload({ item, model }: RenderFnParams) {
    const { props = undefined, field } = item;
    const state = useDeps({ item, model });

    return () =>
        h(GpUpload, {
            value: model[field],
            onUpdateValue: (value: string) => void (model[field] = value),
            ...state,
            ...omit(props, ['value', 'onUpdateValue']),
        });
}
