import { NButton, NFormItemGi, NGrid, NIcon } from 'naive-ui';
import type { RenderFnParams } from '../types';
import { getWidget } from '.';
import { isArray, omit } from 'lodash-unified';
import type { VNode } from 'vue';
import { MinusOutlined } from '@vicons/antd';
import { useDeps } from '../utils';

export function renderMultiple({ item, model }: RenderFnParams) {
    const { props = undefined, field, children, showAddButton, limit, onAddButtonClick, onRemoveButtonClick } = item;

    const state = useDeps({ item, model });

    if (!model[item.field]) {
        console.warn(`表单 model 无 ${field} 字段！`);
        return null;
    }
    if (!children?.length) return null;
    let widgets: VNode[] = [];

    if (isArray(model[field])) {
        for (let i = 0; i < model[field].length; i++) {
            widgets.push(
                ...children.map(child => {
                    return h(
                        NFormItemGi,
                        {
                            ...omit(child, ['props', 'field', 'type', 'apiFn']),
                            showLabel: !!child.label,
                            span: child.span ?? 24,
                            // 验证规则优先级从内到外
                            rule: child.rule ?? item.rule,
                            path: `${field}.${i}.${child.field}`,
                            target: `${field}.${i}.${child.field}`,
                        },
                        getWidget({ item: child, model: model[item.field][i] })
                    );
                })
            );
            if (showAddButton) {
                widgets.push(
                    h(
                        NFormItemGi,
                        {
                            showLabel: true,
                            span: 2,
                        },
                        () =>
                            h(
                                NButton,
                                {
                                    circle: true,
                                    secondary: true,
                                    type: 'error',
                                    disabled: limit ? model[field].length <= limit : false,
                                    onClick() {
                                        onRemoveButtonClick?.(i, item);
                                    },
                                },
                                () => h(NIcon, null, () => h(MinusOutlined))
                            )
                    )
                );
            }
        }
    } else {
        widgets = children?.map(child => {
            return h(
                NFormItemGi,
                {
                    ...omit(child, ['props', 'field', 'type']),
                    showLabel: !!child.label,
                    span: child.span ?? 24,
                    // 验证规则优先级从内到外
                    rule: child.rule ?? item.rule,
                    path: `${field}.${child.field}`,
                },
                getWidget({ item: child, model: model[item.field] })
            );
        });
    }

    return () =>
        h(NGrid, { xGap: 12, ...props, ...state }, () => [
            ...widgets,
            showAddButton &&
                h(NFormItemGi, { span: 24, showFeedback: false, showLabel: false }, () =>
                    h(
                        NButton,
                        {
                            type: 'primary',
                            dashed: true,
                            block: true,
                            onClick() {
                                onAddButtonClick?.(item);
                            },
                        },
                        () => '添加一行'
                    )
                ),
        ]);
}
