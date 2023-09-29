<script setup lang="ts">
import { GpPageWrapper } from '@/components';
import { GpIcon } from '@/components/icon';
import { DeleteOutlined, EditOutlined } from '@vicons/antd';

defineOptions({ name: 'Demo.Components.Icon' });
</script>

<template>
    <GpPageWrapper>
        <p pb20>以 i- 开头的是 unocss icon，以 svg- 开头的是 assets/icons 里的图标，如果是组件，则是 naive icon。</p>
        <NSpace :vertical="true">
            <NSpace text-20>
                <NText>Unocss Icon：</NText>
                <GpIcon icon="i-carbon:3d-cursor"></GpIcon>
                <GpIcon text-rose icon="i-typcn:gift"></GpIcon>
            </NSpace>
            <NSpace text-20>
                <NText>Svg Icon：</NText>
                <GpIcon icon="svg-sidebar-dashboard"></GpIcon>
                <GpIcon icon="svg-sidebar-chart" :svg-icon-props="{ color: 'pink', spin: true }"></GpIcon>
            </NSpace>
            <NSpace text-20>
                <NText>Naive Icon：</NText>
                <GpIcon :icon="DeleteOutlined"></GpIcon>
                <GpIcon :icon="EditOutlined" :icon-props="{ depth: 3, color: 'red' }"></GpIcon>
            </NSpace>
        </NSpace>
    </GpPageWrapper>
</template>

<style lang="scss" scoped></style>
