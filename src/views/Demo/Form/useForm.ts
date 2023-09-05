import { getElementByJson } from '@/components/form';
import type { CascaderOption } from 'naive-ui';

function getOptions(depth = 3, iterator = 1, prefix = '') {
  const length = 12;
  const options: CascaderOption[] = [];
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `v-${i}`,
        label: `l-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, '' + String(i))
      });
    } else if (iterator === depth) {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0
      });
    } else {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, `${prefix}-${i}`)
      });
    }
  }
  return options;
}

export const useForm = () => {
  const model = reactive({
    name: '110',
    intro: '',
    sex: null,
    area: null,
    song: null,
    tree: null,
    datePicker: '1998-11-28 18:00:00',
    cascader: null,
    monaco: 'ls -la',
    multiple: {
      area: null,
      name: ''
    },
    multiple2: [
      {
        area: null,
        name: ''
      },
      {
        area: null,
        name: ''
      },
      {
        area: null,
        name: ''
      }
    ]
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
      },
      {
        field: 'cascader',
        type: 'cascader',
        label: '级联选择',
        span: 6,
        props: {
          multiple: true
        },
        apiFn() {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(getOptions());
            }, 3000);
          });
        }
      },
      {
        field: 'monaco',
        type: 'monacoEditor',
        label: '代码编辑器',
        span: 12,
        rule: { required: true, message: '代码必填' }
      },
      {
        field: 'multiple',
        type: 'multiple',
        label: '混合表单(对象)',
        span: 12,
        children: [
          {
            field: 'name',
            type: 'input',
            span: 12,
            label: '姓名'
          },
          {
            field: 'area',
            type: 'select',
            label: '地区',
            span: 12,
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
          }
        ]
      },
      {
        field: 'multiple2',
        type: 'multiple',
        label: '混合表单(数组)',
        span: 12,
        children: [
          {
            field: 'name',
            type: 'input',
            span: 12
          },
          {
            field: 'area',
            type: 'select',
            span: 12,
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
          }
        ]
      }
    ],
    model
  );

  const meta = {
    elements: elements,
    model: model
    // disabled: true
  };
  return meta;
};
