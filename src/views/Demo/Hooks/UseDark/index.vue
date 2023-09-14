<script setup lang="ts">
import { GpPageWrapper } from '@/components';
import { isDark, toggleDark } from '@/composables';

defineOptions({ name: 'Demo.Hooks.UseDark' });
</script>

<template>
  <GpPageWrapper>
    <NSpace align="center">
      <NText>当前主题色：{{ isDark ? '暗色' : '亮色' }}</NText>
      <NButton type="primary" @click="toggleDark()">切换明暗色</NButton>
    </NSpace>
  </GpPageWrapper>
</template>
