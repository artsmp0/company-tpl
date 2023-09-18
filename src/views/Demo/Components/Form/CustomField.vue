<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import { useFormItem } from 'naive-ui/es/_mixins';

const value = defineModel<string>('value', { local: false, required: true });
const formItem = useFormItem({});
const themes = useThemeVars();
</script>

<template>
  <div>
    <input
      v-model="value"
      type="text"
      class="outline-none bg-base"
      :style="{
        border: `1px solid ${themes.primaryColor}`,
        borderColor: formItem.mergedStatusRef.value === 'error' ? themes.errorColor : themes.primaryColor,
      }"
      @blur="formItem.nTriggerFormBlur"
      @focus="formItem.nTriggerFormFocus"
    />
  </div>
</template>
