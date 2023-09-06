<script setup lang="ts">
import { GpPageWrapper, GpSvgIcon } from '@/components';
</script>

<template>
  <GpPageWrapper>
    <NCard>
      只要是 看到天边云一朵<br />
      逐天拢有好心情
    </NCard>
    <span text="12 primary">
      测试图标和字体对齐
      <GpSvgIcon name="sidebar-dashboard" />
    </span>
    <div v-for="item in 10" :key="item" text="30 primary">
      我是采用 Naive UI 的主题色的字体
      <GpSvgIcon name="sidebar-chart" />Iam
    </div>

    <div class="h300 w300 bg-dark">
      <NScrollbar style="max-height: 100%" x-scrollable>
        <div class="h400 w400">123</div>
      </NScrollbar>
    </div>

    <div class="whitespace-nowrap">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit cupiditate fugit, rerum quod consectetur sapiente
      nulla voluptatem fuga perspiciatis impedit! Accusamus quaerat voluptatibus ipsum assumenda, perspiciatis similique
      provident tempore consequatur?
    </div>
  </GpPageWrapper>
</template>
