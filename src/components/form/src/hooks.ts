import { omit } from 'lodash-unified';
import { getWidget } from './fields';
import type { FormItem, JsonItem } from './types';

export function getElementByJson(json: JsonItem[], model: Recordable) {
  const initialValues: Recordable = {};
  const elements: FormItem[] = [];

  for (const item of json) {
    const { field } = item;
    const value = model[field];
    if (value || value === 0) {
      initialValues[field] = value;
    }
    elements.push({ widget: getWidget({ item, model }), props: omit(item, ['children']) });
  }
  return { elements, initialValues };
}
