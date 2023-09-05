import { NFormItemGi, NGrid } from 'naive-ui';
import type { RenderFnParams } from '../types';
import { getWidget } from '.';
import { isArray, omit } from 'lodash-unified';
import type { VNode } from 'vue';

export function renderMultiple({ item, model }: RenderFnParams) {
  const { props = undefined, field, children } = item;
  if (!model[item.field]) {
    console.warn(`表单 model 无 ${field} 字段！`);
    return null;
  }
  if (!children?.length) return null;
  let widgets: VNode[] = [];
  if (isArray(model[field])) {
    for (let i = 0; i < model[field].length; i++) {
      widgets.push(
        ...children.map((child) => {
          return h(
            NFormItemGi,
            {
              ...omit(child, ['props', 'field', 'type']),
              showLabel: !!child.label,
              span: child.span ?? 24,
              // 验证规则优先级从内到外
              rule: child.rule ?? item.rule,
              path: `${field}.${i}.${child.field}`
            },
            getWidget({ item: child, model: model[item.field][i] })
          );
        })
      );
    }
  } else {
    widgets = children?.map((child) => {
      return h(
        NFormItemGi,
        {
          ...omit(child, ['props', 'field', 'type']),
          showLabel: !!child.label,
          span: child.span ?? 24,
          // 验证规则优先级从内到外
          rule: child.rule ?? item.rule,
          path: `${field}.${child.field}`
        },
        getWidget({ item: child, model: model[item.field] })
      );
    });
  }

  return () => h(NGrid, { xGap: 12, ...props }, () => widgets);
}
