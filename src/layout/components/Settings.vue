<script setup lang="ts">
import { useDiscrete } from '@/composables';
import { useSettingStore } from '@/stores/setting';
import { useClipboard } from '@vueuse/core';
const show = defineModel<boolean>('show');

const settingStore = useSettingStore();

const { copy } = useClipboard({
  legacy: true
});

const { message } = useDiscrete();
const handleCopy = async () => {
  console.log(123123);

  try {
    await copy(JSON.stringify(settingStore.defaultSetting, null, 2));
    message.success('拷贝配置成功！');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    message.warning(error.msg);
  }
};

const animations = ['fade', 'fade-up', 'fade-down', 'fade-slide', 'fade-scale'].map((value) => ({
  value,
  label: value
}));
</script>

<template>
  <!-- @vue-skip -->
  <NDrawer v-model:show="show" :width="300">
    <NDrawerContent title="系统设置">
      <NDivider> 界面显示 </NDivider>
      <div flex="~ col gap-16">
        <div
          v-for="item in settingStore.settingMap"
          :key="item.key"
          flex="~ items-center justify-between"
        >
          <span>{{ item.label }}</span>
          <NSwitch
            v-if="item.type === 'switch'"
            v-model:value="settingStore.defaultSetting[item.key]"
          ></NSwitch>
          <NInputNumber
            v-else-if="item.type === 'inputNumber'"
            v-model:value="settingStore.defaultSetting[item.key]"
            :show-button="false"
            style="width: 150px"
          >
            <template #suffix> PX </template>
          </NInputNumber>
          <NSelect
            v-else-if="item.type === 'select'"
            v-model:value="settingStore.defaultSetting[item.key]"
            style="width: 150px"
            :options="animations"
          ></NSelect>
          <NInput
            v-else-if="item.type === 'input.textarea'"
            v-model:value="settingStore.defaultSetting[item.key]"
            type="textarea"
            style="width: 150px"
          ></NInput>
        </div>
      </div>
      <template #footer>
        <NAlert class="cursor-pointer" type="info" @click="handleCopy"
          >单击此处复制配置，并粘贴到 src/config.json 中生效</NAlert
        >
      </template>
    </NDrawerContent>
  </NDrawer>
</template>
