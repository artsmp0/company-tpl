## 使用文档

### Props

- 默认支持所有 `naive-ui` 的 `DataTable` 支持的所有属性，这些属性此处不再列出。
- `listApi`: 获取接口数据, 类型 ->` (params: any) => Promise<any>`, 默认值 -> 必传。
- `pagerKeys`: 分页接口的参数字段名称, 类型 -> `PagerKeys`:
  - `total`: `'data.meta.total'`,
  - `page`: `'page'`,
  - `pageSize`: `'size'`,
  - `list`: `'data.data'`
- `sorterKeys`: 分页接口的参数字段名称, 类型 -> `SorterKeys`, 具体使用请查看如下例子：

```js
// 指定的排序相关字段
sorterKeys: () => ({
    field: { orderField: 'isAsc', sortField: 'orderByColumn' },
    order: { ascend: 'asc', descend: 'desc' }
  }),

// 最终传给后端的参数
const params = {
  pageSize: 20,
  pageNum: 1,
  // 要进行排序的字段
  orderByColumn: 'storageSize,rowCount',
  // 每个字段需要以什么顺序进行排序
  isAsc: 'asc,desc',
};
```

- `selection`: 开启选择功能, 配合 `$table.value?.getSelectedData` 进行使用。
- `rightUtils`: 表头右侧功能, 默认值: `['size', 'reload', 'fullscreen']`。
- `deepReactive`: 对 `data` 是否采用 `ref` 包裹还是 `shallowRef`，一般如果不需要行内编辑，`shallowRef` 即可，不用深度侦听对象，明显性能会好一些 默认值: `false`。
- `defaultExpandAll`: 扩展自带的默认展开所有，支持异步数据展开所有。

### 实例方法和属性

- `loading`：表格的 `loading` 状态，一般配合 `Search` 的 `Form` 使用，可以得知当前表格是否在搜索中。
- `data`：表格的当前渲染的数据。
- `filter`：表格搜索过滤方法，类型 `(params?: any, withOldParams?: boolean) => Promise<void>`，withOldParams表示是否要合并已经存在的搜索参数。
- `refresh`：刷新当前数据，类型 `(keepPage?: boolean) => void`，`keepPage` 表示是否要保持分页刷新。
- `getSelectedData`：获取选中数据，返回 `count`, `checkedKeys`, `checkedRows` 三个数据。

### 基础示例

```html
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="tsx">
  import { GpTable, type GpTableInst, type TableColumns, useTableListApi, GpPageWrapper } from '@/components';
  import { APIS } from '@/api';
  import type { TableItem } from '@/api/apis/types';
  import Md from './doc.md';

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

  const getSelectedData = () => {
    console.log(selectedData.value);
  };

  const active = ref('1');
</script>

<template>
  <GpPageWrapper inner-scroll>
    <NTabs v-model:value="active" type="line">
      <NTab name="1"> demo </NTab>
      <NTab name="2"> 文档 </NTab>
    </NTabs>
    <div class="mt16 flex-1 of-hidden">
      <Transition name="fade-slide" mode="out-in" appear>
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
      </Transition>
    </div>
  </GpPageWrapper>
</template>
```
