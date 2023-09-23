/* eslint-disable @typescript-eslint/no-explicit-any */
import { getElementByJson } from '@/components/form';
import { isNull } from 'lodash-unified';
import CustomField from './CustomField.vue';
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
                children: getOptions(depth, iterator + 1, '' + String(i)),
            });
        } else if (iterator === depth) {
            options.push({
                value: `v-${prefix}-${i}`,
                label: `l-${prefix}-${i}`,
                disabled: i % 5 === 0,
            });
        } else {
            options.push({
                value: `v-${prefix}-${i}`,
                label: `l-${prefix}-${i}`,
                disabled: i % 5 === 0,
                children: getOptions(depth, iterator + 1, `${prefix}-${i}`),
            });
        }
    }
    return options;
}

export const useForm = (disabled: Ref<boolean>) => {
    const model = reactive({
        name: '110',
        intro: '',
        sex: null,
        area: null,
        song: null,
        tree: null,
        custom: '123123',
        datePicker: '1998-11-28 18:00:00',
        cascader: null,
        monaco: JSON.stringify({ name: 'artsmp', age: 18, male: true }, null, 4),
        multiple: {
            area: null,
            name: '',
        },
        multiple2: [
            {
                area: null,
                name: '',
            },
            {
                area: null,
                name: '',
            },
            {
                area: null,
                name: '',
            },
        ],
        upload: [
            {
                id: 'a',
                name: '我错了，但我可以改.png',
                status: 'error',
            },
            {
                id: 'd',
                name: '现在还不行呢.doc',
                status: 'uploading',
                percentage: 50,
            },
            {
                id: 'c',
                name: '现在就可下载哟.png',
                status: 'finished',
                url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
            },
        ],
        upload2: [],
        upload3: [],
        cascade1: null,
        cascade2: null,
    });
    const { elements } = getElementByJson(
        [
            {
                field: 'name',
                type: 'input',
                span: 8,
                label: '演示外部依赖联动处理',
                deps: [disabled],
                listener() {
                    const state = reactive({ disabled: disabled.value });
                    return state;
                },
            },
            {
                field: 'area',
                type: 'select',
                label: '地区',
                span: 8,
                apiFn() {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve([
                                {
                                    label: '浙江',
                                    value: 1,
                                },
                                {
                                    label: '福建',
                                    value: 2,
                                },
                            ]);
                        }, 3000);
                    });
                },
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
                            value: 1,
                        },
                        {
                            label: '女',
                            value: 2,
                        },
                    ],
                },
            },
            {
                field: 'intro',
                type: 'input',
                label: '个人介绍',
                span: 12,
                rule: { required: true, message: '123' },
                props: {
                    type: 'textarea',
                },
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
                            label: "Rock'n'Roll Star",
                        },
                        {
                            value: 'Shakermaker',
                            label: 'Shakermaker',
                        },
                        {
                            value: 'Live Forever',
                            label: 'Live Forever',
                        },
                        {
                            value: 'Up in the Sky',
                            label: 'Up in the Sky',
                        },
                        {
                            value: '...',
                            label: '...',
                        },
                    ],
                },
            },
            {
                field: 'tree',
                type: 'treeSelect',
                label: '树选择',
                span: 6,
                //  不需要远程加载的数据直接写在 props.options 即可
                apiFn() {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve([
                                {
                                    label: 'Rubber Soul',
                                    key: 'Rubber Soul',
                                    children: [
                                        {
                                            label: "Everybody's Got Something to Hide Except Me and My Monkey",
                                            key: "Everybody's Got Something to Hide Except Me and My Monkey",
                                        },
                                        {
                                            label: 'Drive My Car',
                                            key: 'Drive My Car',
                                            disabled: true,
                                        },
                                        {
                                            label: 'Norwegian Wood',
                                            key: 'Norwegian Wood',
                                        },
                                        {
                                            label: "You Won't See",
                                            key: "You Won't See",
                                            disabled: true,
                                        },
                                        {
                                            label: 'Nowhere Man',
                                            key: 'Nowhere Man',
                                        },
                                        {
                                            label: 'Think For Yourself',
                                            key: 'Think For Yourself',
                                        },
                                        {
                                            label: 'The Word',
                                            key: 'The Word',
                                        },
                                        {
                                            label: 'Michelle',
                                            key: 'Michelle',
                                            disabled: true,
                                        },
                                        {
                                            label: 'What goes on',
                                            key: 'What goes on',
                                        },
                                        {
                                            label: 'Girl',
                                            key: 'Girl',
                                        },
                                        {
                                            label: "I'm looking through you",
                                            key: "I'm looking through you",
                                        },
                                        {
                                            label: 'In My Life',
                                            key: 'In My Life',
                                        },
                                        {
                                            label: 'Wait',
                                            key: 'Wait',
                                        },
                                    ],
                                },
                                {
                                    label: 'Let It Be',
                                    key: 'Let It Be Album',
                                    children: [
                                        {
                                            label: 'Two Of Us',
                                            key: 'Two Of Us',
                                        },
                                        {
                                            label: 'Dig A Pony',
                                            key: 'Dig A Pony',
                                        },
                                        {
                                            label: 'Across The Universe',
                                            key: 'Across The Universe',
                                        },
                                        {
                                            label: 'I Me Mine',
                                            key: 'I Me Mine',
                                        },
                                        {
                                            label: 'Dig It',
                                            key: 'Dig It',
                                        },
                                        {
                                            label: 'Let It Be',
                                            key: 'Let It Be',
                                        },
                                        {
                                            label: 'Maggie Mae',
                                            key: 'Maggie Mae',
                                        },
                                        {
                                            label: "I've Got A Feeling",
                                            key: "I've Got A Feeling",
                                        },
                                        {
                                            label: 'One After 909',
                                            key: 'One After 909',
                                        },
                                        {
                                            label: 'The Long And Winding Road',
                                            key: 'The Long And Winding Road',
                                        },
                                        {
                                            label: 'For You Blue',
                                            key: 'For You Blue',
                                        },
                                        {
                                            label: 'Get Back',
                                            key: 'Get Back',
                                        },
                                    ],
                                },
                            ]);
                        }, 3000);
                    });
                },
                props: {
                    multiple: true,
                    cascade: true,
                    checkable: true,
                    filterable: true,
                },
            },
            {
                field: 'datePicker',
                type: 'datePicker',
                label: '日期',
                span: 6,
                props: {
                    type: 'datetime',
                },
            },
            {
                field: 'cascader',
                type: 'cascader',
                label: '级联选择',
                span: 6,
                props: {
                    multiple: true,
                },
                apiFn() {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve(getOptions());
                        }, 3000);
                    });
                },
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
                        label: '',
                    },
                    {
                        field: 'area',
                        type: 'select',
                        label: '',
                        span: 12,
                        apiFn() {
                            return new Promise(resolve => {
                                setTimeout(() => {
                                    resolve([
                                        {
                                            label: '浙江',
                                            value: 1,
                                        },
                                        {
                                            label: '福建',
                                            value: 2,
                                        },
                                    ]);
                                }, 3000);
                            });
                        },
                    },
                ],
            },
            {
                field: 'multiple2',
                type: 'multiple',
                label: '混合表单(数组)',
                // 开启这个，需要预留 2 的空间给删除按钮
                showAddButton: true,
                limit: 2,
                // rule: { required: true, message: '请填充混合表单的每一项' },
                span: 12,
                children: [
                    {
                        field: 'name',
                        type: 'input',
                        span: 11,
                    },
                    {
                        field: 'area',
                        type: 'select',
                        span: 11,
                        apiFn() {
                            return new Promise(resolve => {
                                setTimeout(() => {
                                    resolve([
                                        {
                                            label: '浙江',
                                            value: 1,
                                        },
                                        {
                                            label: '福建',
                                            value: 2,
                                        },
                                    ]);
                                }, 3000);
                            });
                        },
                    },
                ],
            },
            {
                field: 'upload',
                type: 'upload',
                label: '文件上传',
                span: 12,
                props: {
                    action: 'http://localhost:3000/hhh',
                },
            },
            {
                field: 'upload3',
                type: 'upload',
                label: '文件上传',
                span: 12,
                props: {
                    action: 'http://localhost:3000/hhh',
                    listType: 'image-card',
                },
            },
            {
                field: 'upload2',
                type: 'upload',
                label: '文件上传',
                span: 12,
                props: {
                    action: 'http://localhost:3000/hhh',
                    dragTip: '请上传图片类文件！',
                    // 格式化为后端数据
                    format(file: any) {
                        return {
                            id: file.id,
                            url: file.response.url,
                            filename: file.response.filename,
                        };
                    },
                },
            },
            {
                field: 'monaco',
                type: 'monacoEditor',
                label: '代码编辑器',
                span: 12,
                props: {
                    options: {
                        language: 'json',
                    },
                },
                rule: { required: true, message: '代码必填' },
            },
            {
                field: 'cascade1',
                type: 'select',
                label: '表单联动演示1',
                span: 12,
                props: {
                    options: [
                        { label: '福建', value: '福建' },
                        { label: '浙江', value: '浙江' },
                    ],
                },
            },
            {
                field: 'cascade2',
                type: 'select',
                label: '表单联动演示2',
                deps: ['cascade1'],
                span: 12,
                async apiFn() {
                    let arr: any = [];
                    if (model.cascade1 === '福建') {
                        arr = [
                            { label: '厦门', value: '厦门' },
                            { label: '福州', value: '福州' },
                        ];
                    } else {
                        arr = [
                            { label: '杭州', value: '杭州' },
                            { label: '绍兴', value: '绍兴' },
                        ];
                    }
                    return await new Promise(resolve => {
                        setTimeout(() => {
                            resolve(arr);
                        }, 2000);
                    });
                },
                async listener(fetchData?: any) {
                    const state = reactive({ disabled: isNull(model.cascade1) });
                    if (!model.cascade1) {
                        model.cascade2 = null;
                    } else {
                        await fetchData?.();
                    }
                    return state;
                },
            },
            {
                field: 'custom',
                type: 'custom',
                label: '自定义表单项',
                span: 12,
                rule: { required: true, message: 'xxxx' },
                component: CustomField,
            },
        ],
        model
    );

    const meta = {
        elements: elements,
        model: model,
        // disabled: true
    };
    return meta;
};
