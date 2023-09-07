import type { FormItemGiProps, FormProps } from 'naive-ui';
import type { VNode } from 'vue';

export type FieldType =
  | 'input'
  | 'select'
  | 'inputNumber'
  | 'radio'
  | 'treeSelect'
  | 'datePicker'
  | 'cascader'
  | 'monacoEditor'
  | 'upload'
  | 'multiple';

export interface JsonItem extends FormItemGiProps {
  type: FieldType;
  field: string;
  props?: any;
  children?: JsonItem[];
  /** 需要自动发起 api 请求的 */
  apiFn?: Function;
  /** radio group 显示为 button */
  button?: boolean;
  slots?: Recordable<() => VNode>;
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
