import type { FormItemGiProps, FormProps } from 'naive-ui';

export type FieldType = 'input' | 'select' | 'inputNumber' | 'apiSelect';

export interface JsonItem extends FormItemGiProps {
  type: FieldType;
  field: string;
  props?: any;
  children?: JsonItem[];
  // 需要自动发起 api 请求的
  apiFn?: Function;
}

export type FormItem = {
  widget: any;
  props: JsonItem;
};

export interface GpFormMeta extends FormProps {
  elements: FormItem[];
}

export type RenderFnParams = {
  item: JsonItem;
  model: Recordable;
};
