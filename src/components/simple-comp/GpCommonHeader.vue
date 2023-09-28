<script setup lang="ts">
defineProps<{
    title?: string;
}>();
const router = useRouter();
const handleBack = () => {
    router.back();
};
</script>

<template>
    <NPageHeader class="mb16 shrink-0" @back="handleBack">
        <template #title>
            <slot>{{ title }}</slot>
        </template>
        <template #extra>
            <slot name="extra" />
        </template>
    </NPageHeader>
</template>
