<script setup lang="ts">
import { GpForm, getElementByJson } from '@/components/form';

const model = reactive({
  name: '',
  intro: '',
  sex: null,
  area: null
});
const { elements } = getElementByJson(
  [
    {
      field: 'name',
      type: 'input',
      span: 8,
      label: '姓名'
    },
    {
      field: 'area',
      type: 'apiSelect',
      label: '地区',
      span: 8,
      apiFn() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {
                label: '浙江',
                value: 1
              },
              {
                label: '福建',
                value: 2
              }
            ]);
          }, 3000);
        });
      }
    },
    {
      field: 'sex',
      type: 'select',
      label: '性别',
      span: 8,
      props: {
        options: [
          {
            label: '男',
            value: 1
          },
          {
            label: '女',
            value: 2
          }
        ]
      }
    },
    {
      field: 'intro',
      type: 'input',
      label: '个人介绍',
      span: 12,
      rule: { required: true, message: '123' },
      props: {
        type: 'textarea'
      }
    }
  ],
  model
);

const meta = reactive({
  elements: elements,
  model: model
  // disabled: true
});

const loading = ref(false);
function getData() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    Object.assign(model, {
      name: '阿北',
      intro: '打工仔',
      sex: 1,
      area: 2
    });
  }, 3000);
}
getData();
</script>

<template>
  <div class="page-wrapper">
    <GpForm :meta="meta" :layout="{ xGap: 20 }" :loading="loading"> </GpForm>
    <pre>
      <code>
        {{ model }}
      </code>
    </pre>
  </div>
</template>
