<script setup lang="ts">
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import * as monaco from 'monaco-editor';
import type Monaco from 'monaco-editor';
import { useDark } from '@vueuse/core';
import { useFormItem } from 'naive-ui/es/_mixins';
import { useThemeVars } from 'naive-ui';

// @ts-ignore
window.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (['css', 'scss', 'less'].includes(label)) {
      return new cssWorker();
    }
    if (['html', 'handlebars', 'razor'].includes(label)) {
      return new htmlWorker();
    }
    if (['typescript', 'javascript'].includes(label)) {
      return new tsWorker();
    }
    return new editorWorker();
  }
};

defineOptions({ name: 'GpMonacoEditor' });
const props = withDefaults(
  defineProps<{
    options?: Monaco.editor.IStandaloneEditorConstructionOptions;
    defaultValue?: string;
    value?: string;
  }>(),
  {
    options: () => ({ readOnly: false, language: 'shell' })
  }
);
const emits = defineEmits<{
  blur: [];
  focus: [];
  change: [string];
  'update:value': [string];
  updateValue: [string];
}>();
let editor = null as monaco.editor.IStandaloneCodeEditor | null;
const isDark = useDark();
const curTheme = computed(() => (isDark.value ? 'vs-dark' : 'vs'));
const formItem = useFormItem({});
const editorRef = shallowRef();
const getValue = () => editor?.getValue();
const initMonacoEditor = () => {
  const dom = editorRef.value;
  if (dom) {
    editor = monaco.editor.create(dom, {
      ...props.options,
      readOnly: formItem.mergedDisabledRef.value || props.options?.readOnly,
      value: props.defaultValue ?? props.value,
      automaticLayout: true,
      theme: curTheme.value,
      scrollbar: {
        alwaysConsumeMouseWheel: false
      }
    });
    editor.onDidChangeModelContent(() => {
      const value = editor?.getValue() || '';

      emits('update:value', value);
      emits('updateValue', value);
      emits('change', value);
      console.log('formItem: ', formItem);
      formItem.mergedStatusRef;
      console.log('formItem.mergedStatusRef: ', formItem.mergedStatusRef);
      formItem.nTriggerFormChange();
      formItem.nTriggerFormInput();
    });
    editor.onDidBlurEditorWidget(() => {
      emits('blur');
      formItem.nTriggerFormBlur();
    });
    editor.onDidFocusEditorWidget(() => {
      emits('focus');
      formItem.nTriggerFormFocus();
    });
  }
};
watch(
  () => props.value,
  (val) => {
    if (val !== getValue()) {
      editor?.setValue(val ?? '');
    }
  }
);

watch(
  () => formItem.mergedDisabledRef.value,
  (value) => {
    editor?.updateOptions({ readOnly: value });
  }
);

watch(
  () => isDark.value,
  () => {
    // editor?.dispose()
    // initMonacoEditor()
    editor?.updateOptions({ theme: curTheme.value });
  }
);

onMounted(() => initMonacoEditor());
onUnmounted(() => editor?.dispose());

const themes = useThemeVars();
console.log('themes: ', themes);
</script>

<template>
  <div
    ref="editorRef"
    class="h300 w-full of-hidden rounded-base border-base"
    :style="{
      borderColor: formItem.mergedStatusRef.value === 'error' ? themes.errorColor : undefined
    }"
  ></div>
</template>
