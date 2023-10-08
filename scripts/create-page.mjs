/* eslint-disable no-prototype-builtins */
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { upperFirst } from 'lodash-unified';
import chalk from 'chalk';
import inquirerSearchList from 'inquirer-search-list';

const dotCase = text => {
    return text
        .split('/')
        .map(word => upperFirst(word))
        .join('.');
};

const upperWordFirstCase = text => {
    return text
        .split('/')
        .map(word => upperFirst(word))
        .join('/');
};

const getIconName = () => {
    const iconDir = fileURLToPath(new URL('../src/assets/icons/sidebar', import.meta.url));
    const files = readdirSync(iconDir);
    return ['', ...files.map(file => 'sidebar-' + file.split('.')[0])];
};

/**
 * 自动创建
 * @param {import('plop').NodePlopAPI} plop
 */
export default function (plop) {
    plop.setHelper('dotCase', dotCase);
    plop.setHelper('upperWordFirstCase', upperWordFirstCase);
    plop.setPrompt('searchable-list', inquirerSearchList);
    plop.setGenerator('basics', {
        description: '创建一个页面',
        prompts: [
            {
                type: 'input',
                name: 'filepath',
                message: '文件路径(小写就好)：',
                validate(input) {
                    if (/^[a-zA-Z/]+(?<!\/)$/.test(input)) {
                        return true;
                    }
                    console.log(chalk.red('\n路径不正确！请使用形如 xxx/aaa/bbb 格式！'));
                    return false;
                },
            },
            {
                type: 'input',
                name: 'title',
                message: '菜单标题：',
            },
            {
                type: 'list',
                name: 'isMenu',
                default: 'no',
                choices: ['yes', 'no'],
                message: '是否仅作为菜单：',
            },
            {
                when(context) {
                    return context.isMenu === 'no';
                },
                type: 'list',
                name: 'isDetail',
                default: 'no',
                choices: ['yes', 'no'],
                message: '是否是详情：',
            },
            {
                when(context) {
                    return context.isDetail === 'no' || context.isMenu === 'yes';
                },
                type: 'searchable-list',
                choices: getIconName(),
                name: 'icon',
                message: '菜单图标(sidebar-开头)：',
            },
            {
                when(context) {
                    return context.isMenu === 'no';
                },
                type: 'list',
                name: 'keepAlive',
                default: 'yes',
                choices: ['yes', 'no'],
                message: '是否需要路由保活：',
            },
        ],
        actions(...args) {
            const isSuccess = overwriteMock(args[0]);
            if (!isSuccess) return [];
            return [
                {
                    type: 'add',
                    path: '../src/views/{{upperWordFirstCase filepath}}/index.vue',
                    templateFile: 'templates/page.hbs',
                },
            ];
        },
    });
}

function overwriteMock({ filepath, title, keepAlive, icon, isDetail, isMenu }) {
    const mockFile = fileURLToPath(new URL('../src/router/mock.json', import.meta.url));
    const mockFileContent = readFileSync(mockFile, 'utf-8');
    keepAlive = keepAlive === 'yes' ? true : false;
    isDetail = isDetail === 'yes' ? true : false;
    // 使用 JSON.parse 解析原始内容和要添加的内容
    const originalObj = JSON.parse(mockFileContent);
    const flatRouter = flatRoutes(originalObj.router);
    const addition = {
        path: `/${upperWordFirstCase(filepath)}`,
        meta: {
            title,
            keepAlive,
            icon,
            hideInTab: isDetail,
            hideInMenu: isDetail,
        },
        children: [],
    };
    // 已经存在子路径
    const targetChild = flatRouter.find(r => r.path.includes(addition.path));
    if (targetChild) {
        console.log(chalk.bgRed(`已经存在路径为「${targetChild.path}」的子路径，添加失败！`));
        return false;
    }

    const newMockFileContent = updateContent(originalObj, flatRouter, addition, isDetail);
    writeFileSync(mockFile, newMockFileContent);
    if (isMenu === 'yes') {
        console.log(chalk.bgGreen(`添加菜单项「${addition.path}」成功, 该菜单没有创建页面！`));
        return false;
    }
    return true;
}

function getParent(flatRouter, targetPath) {
    const queue = [];
    const targetParent = flatRouter.find(r => targetPath.includes(r.path));
    if (targetParent) {
        queue.push(targetParent);
        if (targetParent.children?.length) {
            const child = getParent(targetParent.children, targetPath);
            queue.push(...child);
        }
    }
    return queue;
}

function updateContent(originalObj, flatRouter, addition, isDetail) {
    const parents = getParent(flatRouter, addition.path);
    if (parents.length === 0) {
        originalObj.router.push(addition);
    } else {
        const targetParent = parents[parents.length - 1];
        if (targetParent) {
            if (isDetail) {
                targetParent.meta.isPage = true;
            }
            if (!targetParent.children) {
                targetParent.children = [];
            }
            targetParent.children.push(addition);
        } else {
            originalObj.router.push(addition);
        }
    }
    const updatedContent = JSON.stringify(originalObj, null, 2);
    return updatedContent;
}

function flatRoutes(router) {
    const arr = [];
    router.forEach(route => {
        arr.push(route);
        if (route.children && route.children.length > 0) {
            arr.push(...flatRoutes(route.children));
        }
    });
    return arr;
}
