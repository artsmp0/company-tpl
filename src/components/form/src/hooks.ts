import { cloneDeep, omit } from 'lodash-unified';
import { getWidget } from './fields';
import type { FormItem, JsonItem } from './types';

export function getElementByJson(json: JsonItem[], model: Recordable) {
    const initialValues: Recordable = cloneDeep(model);
    const elements = shallowReactive<FormItem[]>([]);

    function updateElements(field: string, item: JsonItem) {
        const idx = elements.findIndex(e => e.props.field === field);
        if (idx === -1) return;
        // @ts-ignore
        elements[idx] = { widget: getWidget({ item, model, updateElements }), props: reactive(omit(item, ['children'])) };
    }

    for (const item of json) {
        // 仅仅针对 props 进行响应式处理
        elements.push({ widget: getWidget({ item, model, updateElements }), props: reactive(omit(item, ['children'])) });
    }

    return { elements, initialValues };
}
