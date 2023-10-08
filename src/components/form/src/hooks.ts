import { cloneDeep, omit } from 'lodash-unified';
import { getWidget } from './fields';
import type { FormItem, JsonItem } from './types';

export function getElementByJson(json: JsonItem[], model: Recordable, observe?: boolean) {
    const initialValues: Recordable = cloneDeep(model);
    const elements = shallowReactive<FormItem[]>([]);

    const genElement = (item: JsonItem) => {
        return {
            widget: getWidget({ item, model }),
            props: omit(item, ['children', 'themeOverrides', 'component']),
        };
    };

    const genElements = () => {
        for (const item of json) {
            // 仅仅针对 props 进行响应式处理
            elements.push(genElement(item));
        }
    };

    /** 更新指定表单项：特别注意 multiple 类型的表单域在修改后需要手动更新，
     * 什么时候需要传 item:那就是 item 存在变化的时候传变化过后的
     *  TODO */
    function updateElements(field: string, item?: JsonItem) {
        if (!item) {
            item = json.find(old => old.field === field);
            if (!item) {
                console.warn('不存在该字段!');
                return;
            }
        }
        const idx = elements.findIndex(e => e.props.field === field);
        if (idx === -1) {
            // 表示新增一项
            elements.push(genElement(item));
            return;
        }
        elements[idx] = genElement(item);
    }

    function reRenderForm() {
        elements.splice(0, Infinity);
        genElements();
    }
    reRenderForm();
    if (observe) {
        // 非必要不要用全局刷新
        watch(json, reRenderForm);
    }

    return { elements, initialValues, reRenderForm, updateElements };
}
