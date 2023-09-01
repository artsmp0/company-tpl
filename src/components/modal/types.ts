import type { ButtonProps } from 'naive-ui';

export interface ModalProps {
  title?: string;
  loading?: boolean;
  width?: number | string;
  showAction?: boolean;
  showConfirmAction?: boolean;
  showCancelAction?: boolean;
  /** 底部按钮组 */
  actions?: { label: string; type?: string; handle: string }[];
  confirmLabel?: string;
  confirmType?: ButtonProps['type'];
  confirmLoading?: boolean;
  /** 取消按钮的文案 @default 取消 */
  cancelLabel?: string;
  /** 取消按钮的类型 @default warning */
  cancelType?: string;
  cancelLoading?: boolean;
  /** 是否是表格的编辑和新增 @default false */
  isCrud?: boolean;
  /** 是否可以拖拽 @default false */
  draggable?: boolean;
  /** 是否显示全屏按钮 @default true */
  fullscreen?: boolean;
}
