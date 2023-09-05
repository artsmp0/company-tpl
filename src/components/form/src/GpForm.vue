<script setup lang="ts">
import type { GridProps } from 'naive-ui';
import type { GpFormMeta } from './types';
import { cloneDeep, omit } from 'lodash-unified';
import { useForm } from './utils';

defineOptions({
  name: 'GpForm'
});

const props = defineProps<{
  meta: GpFormMeta;
  layout?: GridProps;
  loading?: boolean;
}>();

const { formRef, ...rest } = useForm(cloneDeep(props.meta.model as any));
defineExpose(rest);
</script>

<template>
  <NSpin :show="loading" description="努力加载中" class="of-hidden">
    <NForm ref="formRef" v-bind="omit(meta, ['elements'])">
      <NGrid v-bind="layout">
        <NFormItemGi
          v-for="item in meta.elements"
          :key="item.props.field"
          :span="item.props.span ?? 24"
          v-bind="omit(item.props, ['type', 'field', 'props'])"
        >
          <Component :is="item.widget" />
        </NFormItemGi>
      </NGrid>
    </NForm>
  </NSpin>
</template>
