<script setup lang="ts">
import { GpPageWrapper } from '@/components';
import Md from './markdown.md';
// import { APIS } from '@/api';
// import { URLS } from '@/api/apis/common';

// // 演示 get path arg
// APIS.common[URLS.userInfo]({ args: { id: 1 } });
// // 演示 get query
// APIS.common[URLS.getTest]({ params: { search: 'xxx' } });
// // 演示 post
// APIS.common[URLS.postTest]({ data: { password: 'xxx', username: 'artsmp' } });

const loading = ref(true);
setTimeout(() => {
  loading.value = false;
}, 300);
</script>

<template>
  <GpPageWrapper v-loading="loading">
    <div m-auto p16>
      <Md class="m-auto" />
    </div>
  </GpPageWrapper>
</template>
