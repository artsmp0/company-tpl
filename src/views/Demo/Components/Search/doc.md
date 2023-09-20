## 文档

> 仅仅对 `NForm` 进行封装以自适应容器宽度，使用方式和 `naive` 自带的 `NForm` 差不多。

提供的额外 `API` 如下：

-   `minWidth`：表示每个 FormItem 所占的最小宽度，不满足自动换行，默认 `320px`。
-   `v-model:model`：等同于 NForm 的 model，但是注意是双向绑定。
-   `loading`：控制重置和提交按钮的 loading 状态。
-   `onSearch`：点击查询按钮展开。

### 基础示例

```html
<GpSearch v-model:model="model" mb10 :loading="loading" label-width="70px" min-width="250px" @search="handleSearch">
    <NFormItem label="Input" path="text1">
        <NInput v-model:value="model.text1" placeholder="Input" />
    </NFormItem>
    <NFormItem label="Input" path="text2">
        <NInput v-model:value="model.text2" placeholder="Input" />
    </NFormItem>
    <NFormItem label="时间选择" path="date">
        <NDatePicker v-model:formatted-value="model.date" placeholder="时间选择" value-format="yyyy.MM.dd HH:mm:ss" />
    </NFormItem>
    <NFormItem label="范围选择" path="dateRange1">
        <NDatePicker v-model:formatted-value="model.dateRange1" type="daterange" placeholder="Input" />
    </NFormItem>
    <NFormItem label="范围选择" path="inputValue">
        <NDatePicker v-model:formatted-value="model.dateRange2" type="daterange" placeholder="Input" />
    </NFormItem>
</GpSearch>
```

### 渲染效果
