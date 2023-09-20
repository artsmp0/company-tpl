import { NDatePicker } from 'naive-ui';
import type { RenderFnParams } from '../types';
import { omit } from 'lodash-unified';
import { useDeps } from '../utils';

export function renderDatePicker({ item, model }: RenderFnParams) {
    const { props = undefined, field } = item;
    const state = useDeps({ item, model });

    return () =>
        h(NDatePicker, {
            clearable: true,
            formattedValue: model[field],
            onUpdateFormattedValue: (value: string) => void (model[field] = value),
            style: { width: '100%' },
            ...state,
            ...omit(props, ['formattedValue', 'onUpdateFormattedValue']),
        });
}
