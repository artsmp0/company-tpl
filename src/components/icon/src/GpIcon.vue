<script setup lang="ts">
import SvgIcon from '@/components/simple-comp/SvgIcon.vue';
import { NIcon, type IconProps } from 'naive-ui';
import type { Component } from 'vue';

defineOptions({
    name: 'GpIcon',
});

const props = defineProps<{
    /** 针对 naive icon 的配置 */
    iconProps?: Omit<IconProps, 'themeOverrides'>;
    /** 针对 SvgIcon 的配置 */
    svgIconProps?: {
        color?: string;
        size?: string;
        spin?: boolean;
    };
    icon: string | Component;
}>();

const iconType = computed(() => {
    if (typeof props.icon === 'string') {
        if (props.icon.startsWith('svg-')) {
            return h(SvgIcon, {
                name: props.icon.slice(4),
                ...props.svgIconProps,
            });
        } else if (props.icon.startsWith('i-')) {
            return h('div', {
                class: `${props.icon}`,
                style: { display: 'inline-block', verticalAlign: '-0.15em' },
            });
        }
        console.warn('icon name is not correct!');
    } else {
        return h(
            NIcon,
            {
                ...props.iconProps,
            },
            () => h(props.icon as Component)
        );
    }
});
</script>

<template>
    <Component v-bind="$attrs" :is="iconType" />
</template>

<style lang="scss" scoped>
.n-icon {
    vertical-align: -0.15em;
}
</style>
