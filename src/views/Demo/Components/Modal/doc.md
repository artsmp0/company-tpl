## 使用文档

> 注意：在嵌入表单的时候需要 `await open()` 之后，才能获取到表单组件的实例。

### API

- `width`：模态框宽度，默认 `800px`。
- `title`：模态框标题。
- `showAction`：是否显示 footer 操作。
- `actions`：底部按钮组渲染数组，默认带取消和确认两个按钮。
- `confirmLabel`：修改默认的确认按钮的文案。
- `confirmType`：修改默认的确认按钮的类型。
- `confirmLoading`：修改默认的确认按钮的 loading 状态。
- `cancelLabel`：修改默认的取消按钮的文案。
- `cancelType`：修改默认的取消按钮的类型。
- `cancelLoading`：修改默认的取消按钮的 loading 状态。
- `draggable`：是否可以拖拽，默认 false。
- `fullscreen`：是否显示全屏按钮，默认 true。
- `useModal`：需要传入 GpModal 的实例，提供如下两个方法：
  - `open`：打开模态框
  - `close`：关闭模态框

### 基础示例

```html
<script setup lang="ts">
  import { useModal, GpModal, GpPageWrapper } from '@/components';
  import { useDiscrete } from '@/composables';

  const $modal = shallowRef();
  const { open, close } = useModal($modal);

  const showAction = ref(true);
  const showFullscreen = ref(true);
  const draggable = ref(true);

  const { message } = useDiscrete();
  const handleCancel = () => {
    message.info('触发了 cancel 操作！');
  };

  const confirmLoading = ref(false);
  const handleConfirm = () => {
    const m = message.loading('触发了 confirm 操作！3s 后自动关闭！', { duration: 0 });
    confirmLoading.value = true;
    const tid = setTimeout(() => {
      close();
      clearInterval(tid);
      confirmLoading.value = false;
      m.destroy();
    }, 3000);
  };
</script>

<template>
  <GpPageWrapper>
    <Doc />
    <NSpace>
      <NButton type="primary" @click="open()">打开模态框</NButton>
    </NSpace>
    <GpModal
      ref="$modal"
      title="这是标题"
      :show-action="showAction"
      :fullscreen="showFullscreen"
      :draggable="draggable"
      :confirm-loading="confirmLoading"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    >
      <NSpace vertical align="center">
        这是模态框内容，draggable 属性可以让这个模态框可拖拽
        <NButton type="primary" @click="showAction = !showAction">切换footer</NButton>
        <NButton type="primary" @click="showFullscreen = !showFullscreen">是否显示全屏按钮</NButton>
        <NButton type="primary" @click="close">调用函数关闭此模态框</NButton>
      </NSpace>
    </GpModal>
  </GpPageWrapper>
</template>
```
