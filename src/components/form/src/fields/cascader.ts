import { NCascader, NSpin } from 'naive-ui';
import type { RenderFnParams } from '../types';
import { omit } from 'lodash-unified';
import { useDeps, useFetchField } from '../utils';

export function renderCascader({ item, model }: RenderFnParams) {
    const { props = undefined, field, apiFn } = item;

    const fetchRes = useFetchField(apiFn);
    const state = useDeps({ item, model }, fetchRes);

    return () =>
        h(
            NCascader,
            {
                clearable: true,
                maxTagCount: 'responsive',
                options: fetchRes?.options.value,
                value: model[field],
                onUpdateValue: (value: string) => void (model[field] = value),
                ...state,
                ...omit(props, ['value', 'onUpdateValue']),
            },
            {
                arrow: () =>
                    fetchRes?.loading.value
                        ? h(NSpin, {
                              size: 12,
                          })
                        : undefined,
            }
        );
}
