import { NSelect } from 'naive-ui';
import type { RenderFnParams } from '../types';
import { omit } from 'lodash-unified';
import { useDeps, useFetchField } from '../utils';

export function renderSelect({ item, model }: RenderFnParams) {
    const { props = undefined, field, apiFn } = item;
    const fetchRes = useFetchField(apiFn);
    const state = useDeps({ item, model }, fetchRes);
    return () =>
        h(NSelect, {
            value: model[field],
            onUpdateValue: (v: string) => (model[field] = v),
            clearable: true,
            loading: fetchRes?.loading.value,
            options: fetchRes?.options.value,
            filterable: true,
            ...state,
            ...omit(props, ['value', 'onUpdateValue']),
        });
}
