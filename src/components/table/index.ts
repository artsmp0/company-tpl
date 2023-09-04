import Table from './src/GpTable.vue';
export type { TableColumns } from './src/types';
export type GpTableInst = InstanceType<typeof Table>;
export * from './src/hooks/useListApi';
export const GpTable = Table;
