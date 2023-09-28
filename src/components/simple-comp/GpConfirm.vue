<script setup lang="ts">
import type { ButtonProps } from 'naive-ui';

defineProps<{
    message: string;
    buttonProps?: Omit<ButtonProps, 'themeOverrides'>;
}>();
const emits = defineEmits<{
    confirm: [];
}>();

const show = ref(false);

const loading = ref(false);
const handlePositiveClick = async () => {
    try {
        loading.value = true;
        await emits('confirm');
    } finally {
        loading.value = false;
    }
};

const handleCancel = () => {
    show.value = false;
};
</script>

<template>
    <NPopconfirm v-bind="$attrs" v-model:show="show">
        <template #trigger>
            <NButton v-bind="buttonProps" @click.stop="">
                <slot> </slot>
            </NButton>
        </template>
        {{ message }}
        <template #action>
            <NSpace size="small">
                <NButton size="tiny" @click="handleCancel">取消</NButton>
                <NButton type="primary" size="tiny" :loading="loading" @click="handlePositiveClick">确认</NButton>
            </NSpace>
        </template>
    </NPopconfirm>
</template>
