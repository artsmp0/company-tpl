<script setup lang="ts">
import type { GridProps } from 'naive-ui';
import type { GpFormMeta } from './types';
import { omit } from 'lodash-unified';

defineOptions({
  name: 'GpForm'
});

defineProps<{
  meta: GpFormMeta;
  layout?: GridProps;
  loading?: boolean;
}>();
</script>

<template>
  <NSpin :show="loading">
    <NForm v-bind="omit(meta, ['elements'])">
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
