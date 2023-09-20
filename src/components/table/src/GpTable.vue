<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import type { GupoTableProps } from './types';
import { useData } from './hooks/useData';
import type { DataTableRowKey } from 'naive-ui';
import { useColumn } from './hooks/useColumn';
import type { ShallowRef } from 'vue';
import type { RowData } from 'naive-ui/es/data-table/src/interface';
import RightUtils from './components/RightUtils.vue';
/**
 * 请注意：开启了 remote 选项后，本地排序和过滤会失效！仅能监听 update:sorter 排序
 * 本组件主要针对远程数据处理进行提效，若要其他功能请直接使用未封装的 table 组件
 * 请注意：不开启 remote 选项，pagination 的 total 默认直接取的是 data 的 数据长度！
 */

defineOptions({
    name: 'GpTable',
});

const props = withDefaults(defineProps<GupoTableProps>(), {
    pagerKeys: () => ({
        total: 'data.meta.total',
        page: 'page',
        pageSize: 'size',
        list: 'data.data',
    }),
    // 服务端排序才需要开启这个选项
    // sorterKeys: () => ({
    //   field: { orderField: 'isAsc', sortField: 'orderByColumn' },
    //   order: { ascend: 'asc', descend: 'desc' }
    // }),
    selection: false,
    rightUtils: () => ['size', 'reload', 'fullscreen'],
    size: 'medium',
    deepReactive: false,
    defaultExpandAll: false,
});

const { computedColumns } = useColumn(() => props as GupoTableProps);

const checkedKeys = ref<DataTableRowKey[]>([]);
const checkedRows = shallowRef<any[]>([]);
const handleCheck = (keys: DataTableRowKey[], rows: any[]) => {
    checkedKeys.value = keys;
    checkedRows.value = rows;
};

const getSelectedData = <T extends any>() => {
    return {
        count: checkedKeys.value.length,
        checkedKeys,
        checkedRows: checkedRows as unknown as ShallowRef<T[]>,
    };
};
/** 数据刷新时，选中行的数据最好也要刷新一下，避免前后数据不一致的问题 */
const updateCheckedRows = () => {
    if (checkedKeys.value.length === 0 || !props.selection) return;
    checkedRows.value = checkedKeys.value.map(k => {
        return data.value.find(row => props.rowKey?.(row) === k);
    });
};
const { data, loading, pagination, filter, refresh, handleSorterChange } = useData(() => props as GupoTableProps, updateCheckedRows);

/** 异步数据支持展开所有行 */
const attrs = useAttrs() as any;
const resolveExpandedRowKeys = (rows: RowData[]) => {
    const keys: Key[] = [];
    rows.forEach(row => {
        const children = row[attrs['children-key'] ?? 'children'];
        if (children && children.length > 0) {
            const key = props.rowKey!(row);
            keys.push(key);
            keys.push(...resolveExpandedRowKeys(children));
        }
    });
    return keys;
};
const defaultExpandedRowKeys = ref<Key[]>([]);
const stop = watch(data, () => {
    stop();
    if (!props.defaultExpandAll) {
        return;
    }
    if (!props.rowKey) {
        return;
    }
    // 无法直接替换 defaultExpandedRowKeys
    defaultExpandedRowKeys.value.push(...resolveExpandedRowKeys(data.value));
});

defineExpose({
    loading,
    filter,
    refresh,
    getSelectedData,
    data,
});
const size = ref(props.size);

const $tableWrapper = shallowRef<HTMLDivElement>();
</script>

<template>
    <div ref="$tableWrapper" class="h-full rounded-base p-12 pt0 border-base bg-base text-base" flex="~ col">
        <div class="h44" flex="~ justify-between items-center">
            <div>
                <slot v-if="!props.selection" name="title" />
                <span v-if="checkedKeys.length" text-gray>
                    当前已选中
                    <strong class="text-red">{{ checkedKeys.length }}</strong>
                    项，
                    <NButton size="small" type="info" text @click="handleCheck([], [])"> 取消所有 </NButton>
                </span>
            </div>
            <div flex="~ items-center gap16">
                <slot name="extra" />
                <RightUtils v-model:size="size" :options="props.rightUtils" :wrapper="$tableWrapper" :reload="refresh" />
            </div>
        </div>
        <NDataTable
            class="flex-1"
            remote
            :loading="loading"
            :columns="computedColumns"
            :data="data"
            :pagination="pagination"
            v-bind="$attrs"
            :checked-row-keys="checkedKeys"
            :size="size"
            :row-key="props.rowKey"
            :default-expanded-row-keys="defaultExpandedRowKeys"
            @update:sorter="handleSorterChange"
            @update:checked-row-keys="handleCheck"
        >
        </NDataTable>
    </div>
</template>
./types
