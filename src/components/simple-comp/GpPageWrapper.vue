<script setup lang="ts">
import { isDev } from '@/utils';

defineOptions({
    name: 'GpPageWrapper',
});
const props = withDefaults(
    defineProps<{
        innerScroll?: boolean;
        padding?: number | string;
        xScrollable?: boolean;
    }>(),
    { padding: '16px' }
);

const styles = computed(() => ({
    padding: parseInt(props.padding as string) + 'px',
}));
</script>

<template>
    <div v-if="innerScroll" class="h-full flex flex-col" :style="styles">
        <slot />
    </div>
    <div v-else class="h-full w-full of-auto">
        <NScrollbar :x-scrollable="xScrollable">
            <div :style="styles">
                <slot />
            </div>
            <NBackTop :right="isDev() ? 100 : 40" />
        </NScrollbar>
    </div>
</template>
