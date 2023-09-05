<script setup lang="ts">
import { GpForm, getElementByJson, type GpFormInst } from '@/components/form';

const model = reactive({
  name: '110',
  intro: '',
  sex: null,
  area: null,
  song: null,
  tree: null,
  datePicker: '1998-11-28 18:00:00'
});
const { elements, initialValues } = getElementByJson(
  [
    {
      field: 'name',
      type: 'input',
      span: 8,
      label: '姓名'
    },
    {
      field: 'area',
      type: 'select',
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
    },
    {
      field: 'song',
      type: 'radio',
      label: '喜欢的歌',
      span: 12,
      button: true,
      props: {
        options: [
          {
            value: "Rock'n'Roll Star",
            label: "Rock'n'Roll Star"
          },
          {
            value: 'Shakermaker',
            label: 'Shakermaker'
          },
          {
            value: 'Live Forever',
            label: 'Live Forever'
          },
          {
            value: 'Up in the Sky',
            label: 'Up in the Sky'
          },
          {
            value: '...',
            label: '...'
          }
        ]
      }
    },
    {
      field: 'tree',
      type: 'treeSelect',
      label: '树选择',
      span: 6,
      //  不需要远程加载的数据直接写在 props.options 即可
      apiFn() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {
                label: 'Rubber Soul',
                key: 'Rubber Soul',
                children: [
                  {
                    label: "Everybody's Got Something to Hide Except Me and My Monkey",
                    key: "Everybody's Got Something to Hide Except Me and My Monkey"
                  },
                  {
                    label: 'Drive My Car',
                    key: 'Drive My Car',
                    disabled: true
                  },
                  {
                    label: 'Norwegian Wood',
                    key: 'Norwegian Wood'
                  },
                  {
                    label: "You Won't See",
                    key: "You Won't See",
                    disabled: true
                  },
                  {
                    label: 'Nowhere Man',
                    key: 'Nowhere Man'
                  },
                  {
                    label: 'Think For Yourself',
                    key: 'Think For Yourself'
                  },
                  {
                    label: 'The Word',
                    key: 'The Word'
                  },
                  {
                    label: 'Michelle',
                    key: 'Michelle',
                    disabled: true
                  },
                  {
                    label: 'What goes on',
                    key: 'What goes on'
                  },
                  {
                    label: 'Girl',
                    key: 'Girl'
                  },
                  {
                    label: "I'm looking through you",
                    key: "I'm looking through you"
                  },
                  {
                    label: 'In My Life',
                    key: 'In My Life'
                  },
                  {
                    label: 'Wait',
                    key: 'Wait'
                  }
                ]
              },
              {
                label: 'Let It Be',
                key: 'Let It Be Album',
                children: [
                  {
                    label: 'Two Of Us',
                    key: 'Two Of Us'
                  },
                  {
                    label: 'Dig A Pony',
                    key: 'Dig A Pony'
                  },
                  {
                    label: 'Across The Universe',
                    key: 'Across The Universe'
                  },
                  {
                    label: 'I Me Mine',
                    key: 'I Me Mine'
                  },
                  {
                    label: 'Dig It',
                    key: 'Dig It'
                  },
                  {
                    label: 'Let It Be',
                    key: 'Let It Be'
                  },
                  {
                    label: 'Maggie Mae',
                    key: 'Maggie Mae'
                  },
                  {
                    label: "I've Got A Feeling",
                    key: "I've Got A Feeling"
                  },
                  {
                    label: 'One After 909',
                    key: 'One After 909'
                  },
                  {
                    label: 'The Long And Winding Road',
                    key: 'The Long And Winding Road'
                  },
                  {
                    label: 'For You Blue',
                    key: 'For You Blue'
                  },
                  {
                    label: 'Get Back',
                    key: 'Get Back'
                  }
                ]
              }
            ]);
          }, 3000);
        });
      },
      props: {
        multiple: true,
        cascade: true,
        checkable: true,
        filterable: true
      }
    },
    {
      field: 'datePicker',
      type: 'datePicker',
      label: '日期',
      span: 6,
      props: {
        type: 'datetime'
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
  }, 1000);
}
getData();

const $form = shallowRef<GpFormInst>();

const getValues = () => {
  console.log($form.value?.getValues());
};
</script>

<template>
  <div class="page-wrapper">
    <NSpace>
      <NButton @click="$form?.resetValues()">重置</NButton>
      <NButton @click="getValues">获取表单</NButton>
    </NSpace>
    <GpForm ref="$form" :meta="meta" :layout="{ xGap: 20 }" :loading="loading"> </GpForm>
    <pre><code>{{ model }}</code></pre>
  </div>
</template>
