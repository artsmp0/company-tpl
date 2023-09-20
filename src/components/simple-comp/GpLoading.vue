<script setup lang="ts">
import { NSpin } from 'naive-ui';

defineOptions({
    name: 'GpLoading',
});

defineProps<{
    show: boolean;
}>();
</script>

<template>
    <div v-if="show" class="gp-loading">
        <NSpin />
    </div>
</template>

<style lang="scss" scoped>
.gp-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 200px;
}
</style>
