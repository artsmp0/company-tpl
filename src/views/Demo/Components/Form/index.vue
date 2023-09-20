<script setup lang="ts">
import { GpForm, type GpFormInst } from '@/components/form';
import { useDiscrete } from '@/composables';
import { useForm } from './useForm';
import { GpPageWrapper } from '@/components';
import { useToggle } from '@vueuse/core';

const [disabled, toggleDisabled] = useToggle();
const meta = useForm(disabled);

function getData() {
    setTimeout(() => {
        Object.assign(meta.model, {
            name: '阿北',
            intro: '打工仔',
            sex: 1,
            area: 2,
        });
    }, 1000);
}
getData();

const $form = shallowRef<GpFormInst>();
const { message } = useDiscrete();
const getValues = () => {
    // 两种都可以获取
    console.log($form.value?.getValues());
    message.info(JSON.stringify(meta.model));
};

const handleSubmit = async () => {
    await $form.value?.validate();
    message.info(JSON.stringify(meta.model));
};
</script>

<template>
    <GpPageWrapper>
        <NSpace mb16>
            <NButton @click="getValues">获取表单</NButton>
            <NButton type="error" @click="$form?.resetValues()">重置</NButton>
            <NButton type="primary" @click="handleSubmit">提交</NButton>
            <NButton @click="toggleDisabled()">演示外部依赖联动处理</NButton>
        </NSpace>
        <GpForm ref="$form" :meta="meta" :layout="{ xGap: 20 }"> </GpForm>
        <NSpace> </NSpace>
        <pre><code>{{ meta.model }}</code></pre>
    </GpPageWrapper>
</template>
