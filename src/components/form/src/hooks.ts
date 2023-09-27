import { cloneDeep, omit } from 'lodash-unified';
import { getWidget } from './fields';
import type { FormItem, JsonItem } from './types';

export function getElementByJson(json: JsonItem[], model: Recordable, observe?: boolean) {
    const initialValues: Recordable = cloneDeep(model);
    const elements = shallowReactive<FormItem[]>([]);

    const genElements = () => {
        for (const item of json) {
            // 仅仅针对 props 进行响应式处理
            elements.push({
                widget: getWidget({ item, model }),
                props: omit(item, ['children', 'themeOverrides', 'component']),
            });
        }
    };

    /** 更新指定表单项：特别注意 multiple 类型的表单域在修改后需要手动更新， TODO */
    function updateElements(field: string, item: JsonItem) {
        const idx = elements.findIndex(e => e.props.field === field);
        if (idx === -1) {
            // 表示新增一项
            elements.push({
                widget: getWidget({ item, model }),
                props: omit(item, ['children', 'themeOverrides', 'component']),
            });
            return;
        }
        elements[idx] = {
            widget: getWidget({ item, model }),
            props: omit(item, ['children', 'themeOverrides', 'component']),
        };
    }

    function reRenderForm() {
        elements.splice(0, Infinity);
        genElements();
    }
    reRenderForm();
    if (observe) {
        watch(json, (v, oldV) => {
            console.log('v, oldV: ', v, oldV);
            reRenderForm();
        });
    }

    return { elements, initialValues, reRenderForm, updateElements };
}
