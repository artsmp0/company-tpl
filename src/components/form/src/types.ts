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
    /** 是否在对依赖处理的时候需要深度监听 */
    deep?: boolean;
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
    /** 针对混合表单（数组），点击添加一行按钮执行的函数 默认取表单项的第一项插入 */
    onAddButtonClick?: (item: JsonItem) => void;
    /** 针对混合表单（数组），点击每一项的删除按钮触发 */
    onRemoveButtonClick?: (idx: number, item: JsonItem) => void;
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
