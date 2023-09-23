/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormItemGiProps, FormProps } from 'naive-ui';
import type { VNode, Ref, Component, ShallowRef } from 'vue';

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
    | 'custom'
    | 'multiple';

export interface JsonItem extends FormItemGiProps {
    type: FieldType;
    field: string;
    props?: any;
    deps?: (string | Ref<any>)[];
    listener?: Function;
    hide?: boolean;
    children?: JsonItem[];
    /** 需要自动发起 api 请求的 */
    apiFn?: Function;
    /** radio group 显示为 button */
    button?: boolean;
    slots?: Recordable<() => VNode>;
    component?: Component;
    /** 针对混合表单（数组），表示是否添加一行 */
    showAddButton?: boolean;
    /** 针对混合表单（数组），表示最少要几行 */
    limit?: number;
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
    updateElements?: (field: string, item: JsonItem) => void;
};
