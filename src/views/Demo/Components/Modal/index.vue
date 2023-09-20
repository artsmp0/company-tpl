<script setup lang="ts">
import { useModal, GpModal, GpPageWrapper } from '@/components';
import { useDiscrete } from '@/composables';
import Doc from './doc.md';

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
