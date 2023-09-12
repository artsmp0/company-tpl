<script setup lang="ts">
import type { GridProps } from 'naive-ui';
import type { GpFormMeta } from './types';
import { cloneDeep, omit } from 'lodash-unified';
import { useForm } from './utils';

defineOptions({
  name: 'GpForm',
});
const props = withDefaults(
  defineProps<{
    meta: GpFormMeta;
    layout?: GridProps;
    loading?: boolean;
    scrollToFirstError?: boolean;
  }>(),
  {
    scrollToFirstError: true,
  }
);

// watch(
//   () => props.meta,
//   (v) => {
//     console.log('xxxxx', v);
//   },
//   { deep: true }
// );

const { formRef, ...rest } = useForm(cloneDeep(props.meta.model as any), () => props.scrollToFirstError);
defineExpose(rest);
</script>

<template>
  <NSpin :show="loading" description="努力加载中" class="of-hidden">
    <NForm ref="formRef" v-bind="omit(meta, ['elements'])">
      <NGrid v-bind="layout">
        <template v-for="item in meta.elements" :key="item.props.field">
          <NFormItemGi
            v-if="!item.props.hide"
            :span="item.props.span ?? 24"
            :path="item.props.field"
            :target="item.props.field"
            v-bind="omit(item.props, ['type', 'field', 'props', 'apiFn'])"
          >
            <Component :is="item.widget" />
          </NFormItemGi>
        </template>
      </NGrid>
    </NForm>
  </NSpin>
</template>
