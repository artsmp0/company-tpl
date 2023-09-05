import Form from './src/GpForm.vue';

export type { GpFormMeta } from './src/types';
export type GpFormInst = InstanceType<typeof Form>;
export * from './src/hooks';
export const GpForm = Form;
