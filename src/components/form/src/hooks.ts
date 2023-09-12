import { cloneDeep, omit } from 'lodash-unified';
import { getWidget } from './fields';
import type { FormItem, JsonItem } from './types';

export function getElementByJson(json: JsonItem[], model: Recordable) {
  const initialValues: Recordable = cloneDeep(model);
  const elements: FormItem[] = [];

  for (const item of json) {
    // @ts-ignore
    elements.push(reactive({ widget: getWidget({ item, model }), props: omit(item, ['children']) }));
  }
  return { elements, initialValues };
}
