<script setup lang="ts">
import { GpPageWrapper } from '@/components';
import { useDiscrete } from '@/composables';

defineOptions({ name: 'Demo.Hooks.UseDiscrete' });
const { dialog, message, notification } = useDiscrete();

const showMsg = () => {
    message.success('点击了『显示消息』按钮！');
};

const showNotify = () => {
    notification.success({
        content: '点击了『显示通知』按钮！',
        title: '通知',
        duration: 1000,
    });
};

const showDialog = () => {
    dialog.info({
        title: '这是弹框',
        content: '点击了『显示弹框』按钮！',
    });
};
</script>

<template>
    <GpPageWrapper>
        <p mb8 text-rose>封装全局弹框类通知，避免 各种 XxxProvider，支持组件内外使用。</p>
        <NSpace>
            <NButton @click="showMsg">显示消息</NButton>
            <NButton @click="showNotify">显示通知</NButton>
            <NButton @click="showDialog">显示弹框</NButton>
        </NSpace>
    </GpPageWrapper>
</template>
