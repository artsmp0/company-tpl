<script setup lang="ts">
defineOptions({
  name: 'Demo.NestIsPage.Page1',
});
</script>

<template>
  <div p16>
    <NInput />
    这是一个有详情的嵌套路由
    <NButton @click="$router.push('/demo/nest-is-page/page1/detail')">去详情</NButton>
  </div>
</template>
