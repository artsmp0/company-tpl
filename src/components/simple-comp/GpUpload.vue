<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { UploadOutlined } from '@vicons/antd';
import { ArchiveOutline } from '@vicons/ionicons5';
import type { UploadFileInfo, UploadProps } from 'naive-ui';

const props = defineProps<{
  value: any;
  onUpdateValue: (v: any) => void;
  /** 判断是否上传成功 */
  isSuccess?: (response: any) => boolean;
  /** 将后端数据转成 naive-ui 需要的文件列表 */
  toFileList?: (value: any[]) => UploadProps['fileList'];
  /** 格式化成后端需要的数据格式 */
  format?: (file: UploadFileInfo & { response: any }) => any;
  dragTip?: string;
}>();

const list = shallowRef<UploadProps['fileList']>([]);

const stop = watch(
  () => props.value,
  async () => {
    list.value = props.toFileList?.(props.value) ?? props.value;
    await nextTick();
    stop();
  },
  { immediate: true }
);

const handleFinish: UploadProps['onFinish'] = ({ file, event }) => {
  const response = JSON.parse((event?.target as any).response);
  if (!props.isSuccess || props.isSuccess?.(response)) {
    const newFile = { ...file, response };
    props.onUpdateValue([...props.value, props.format?.(newFile) ?? newFile]);
  } else {
    file.status = 'error';
  }
  return file;
};

const attrs: any = useAttrs();
const handleRemove: UploadProps['onRemove'] = ({ file, fileList }) => {
  if (attrs.onRemove) {
    return attrs.onRemove({ file, fileList });
  }
  // 需要服务端 id 或者前端处理加上 uuid
  const targetIdx = list.value?.findIndex((item) => item.id === file.id);
  console.log('targetIdx: ', targetIdx);
  if (targetIdx !== undefined) {
    // 找到了就手动移除
    // list.value?.splice(targetIdx, 1);
    // console.log('list.value: ', list.value);
    props.onUpdateValue(props.value.filter((f: any) => f.id !== file.id));
  }
  return true;
};
</script>

<template>
  <NUpload v-bind="$attrs" v-model:file-list="list" @finish="handleFinish" @remove="handleRemove">
    <slot>
      <NButton v-if="!props.dragTip && attrs.listType !== 'image-card'" type="primary">
        <template #icon>
          <NIcon><UploadOutlined /></NIcon>
        </template>
        上传文件
      </NButton>
      <NUploadDragger v-else-if="attrs.listType !== 'image-card'">
        <div style="margin-bottom: 12px">
          <NIcon size="48" :depth="3">
            <ArchiveOutline />
          </NIcon>
        </div>
        <NText style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </NText>
        <NP depth="3" style="margin: 8px 0 0">
          {{ props.dragTip }}
        </NP>
      </NUploadDragger>
    </slot>
  </NUpload>
</template>

<style lang="scss" scoped>
:deep(.n-upload-trigger) {
  width: 100%;
}
</style>
