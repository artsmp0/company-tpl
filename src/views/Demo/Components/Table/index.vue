<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="tsx">
import { GpTable, type GpTableInst, type TableColumns, useTableListApi, GpPageWrapper } from '@/components';
import { APIS } from '@/api';
import type { TableItem } from '@/api/apis/types';
import Md from './doc.md';
import { useDiscrete } from '@/composables';

const columns: TableColumns<TableItem> = [
    {
        key: 'name',
        width: 200,
        title: '表名',
    },
    {
        key: 'notes',
        title: '描述',
        width: 80,
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: '数据量（行）',
        key: 'rowCount',
        sorter: {
            multiple: 1,
        },
    },
    {
        title: '占用磁盘',
        key: 'storageSize',
        sorter: {
            multiple: 3,
        },
    },
    {
        title: '最近更新时间',
        key: 'activeTime',
        sorter: true,
    },
];
const { getList } = useTableListApi(APIS.common['/tag/tb/bind/list'], true);
const $table = shallowRef<GpTableInst>();

const selectedData = computed(() => {
    return $table.value?.getSelectedData<TableItem>();
});

const { message } = useDiscrete();
const getSelectedData = () => {
    message.success('请查看控制台打印结果！');
    console.log(selectedData.value);
};

const active = ref('1');
</script>

<template>
    <GpPageWrapper inner-scroll class="pt0!">
        <NTabs v-model:value="active" type="line">
            <NTab name="1"> demo </NTab>
            <NTab name="2"> 文档 </NTab>
        </NTabs>
        <div class="mt16 flex-1 of-hidden">
            <Transition name="fade-slide" mode="out-in" appear>
                <KeepAlive>
                    <GpPageWrapper v-if="active === '1'" inner-scroll padding="0">
                        <div class="mb8 shrink-0" flex="~ items-center gap-16 ">
                            <NButton @click="getSelectedData">获取选中数据</NButton>
                        </div>
                        <GpTable
                            ref="$table"
                            class="flex-1"
                            :row-key="(row: any) => row.urn"
                            :columns="columns"
                            :sorter-keys="{
                                field: { orderField: 'isAsc', sortField: 'orderByColumn' },
                                order: { ascend: 'asc', descend: 'desc' },
                            }"
                            selection
                            flex-height
                            :list-api="getList"
                            :pager-keys="{
                                list: 'data.data.rows',
                                total: 'data.data.total',
                                page: 'pageNum',
                                pageSize: 'pageSize',
                            }"
                        />
                    </GpPageWrapper>
                    <GpPageWrapper v-else padding="0">
                        <Md />
                    </GpPageWrapper>
                </KeepAlive>
            </Transition>
        </div>
    </GpPageWrapper>
</template>
