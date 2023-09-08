# naive-admin

> 古珀科技前端团队

### API 请求

> 对于 `axios` 的封装以及使用均在 `src/api` 目录中。

##### 以下是目录组织方式和文件功能解释：

```bash
 api
├──  index.ts                     # 接口模块文件整合导出
├──  apis                         # 存放接口请求文件，可以根据自己需要选择按模块分割或者统一放在 common 文件中
│  ├──  auth.ts                   # 用户权限相关的接口，一般不需要动
│  ├──  common.ts                 # 普通接口，放在一个文件是为了保证接口的唯一性，避免重复定义
│  └──  types.ts                  # 接口请求和响应参数的类型定义
└──  request                      # 封装 axios
   ├──  index.ts                  # 导出 get、post、request三个方法便于使用
   ├──  interceptors              # 存放拦截器
   │  ├──  addToken.ts            # 添加 token
   │  ├──  parseArgs.ts           # 解析路径参数
   │  ├──  repeatReqHandler.ts    # 重复请求处理
   │  └──  resHandler.tsx         # 请求结果处理
   ├──  request.ts                # axios 封装及类型支持
   └──  types.ts                  # 存放封装 axios 时用到的类型，以及请求结果的基础形状和分页参数的基础形状
```

##### 如何定义一个接口模块？

此处以 `common` 模块举例：

新建文件，例如 `api/apis/user.ts`，填入如下内容。 `get`、`post`、`pathArgGet`均是 `request` 方法的快解封装，仅仅只是为了减少类型参数的定义。

```ts
import { get, pathArgGet, post } from '../request';
import type { BaseRes, PageParams, PageRes } from '../request/types';
import type { TableItem, TagTbBindListParams } from './types';

export const enum URL {
  getTest = '/api/get',
  postTest = '/api/post',
  tableList = '/tag/tb/bind/list',
  userInfo = '/api/user/{id}',
}

export default {
  /** 演示 get 分页请求 */
  [URL.tableList]: get<PageRes<TableItem>, PageParams<TagTbBindListParams>>(URL.tableList),
  /** 演示 get 普通请求 */
  [URL.getTest]: get<BaseRes<TableItem>, { search?: string; xx?: string }>(URL.getTest),
  /** 演示 post 请求 */
  [URL.postTest]: post<BaseRes<boolean>, { username: string; password: string }>(URL.postTest),
  /** 此处演示路径参数的请求方式，此种写法等同于改行下的注释 */
  [URL.userInfo]: pathArgGet<BaseRes<TableItem>, URL.userInfo>(URL.userInfo),
  // [URL.userInfo]: request<BaseRes<TableItem>, undefined, undefined, URL.userInfo>({ url: URL.userInfo })
};
```

> 请注意，当使用该模板进行接口请求时，请先根据后端接口适配 `api/request/types.ts` 文件里的三个类型： `BaseRes`、`PageParams`、`PageRes`。

还有记得查看 `src/api/request/resHandler.tsx` 文件，根据 `BaseRes` 修改的结果修改如下行代码：

```ts
// 业务错误直接这里报错的话，要求后端 msg 必填
(response.config as unknown as any).showMessage && message.error(**data.msg**);
```

##### 如何使用一个接口定义？

在任意文件中先引入 APIS，然后跟随 ts 提示一步步 enter 下去即可。如下是示例请求：

```html
<script setup lang="ts">
  import { GpPageWrapper } from '@/components';
  import Md from './markdown.md';
  import { APIS } from '@/api';
  import { URLS } from '@/api/apis/common';

  // 演示 get path arg
  APIS.common[URLS.userInfo]({ args: { id: 1 } });
  // 演示 get query
  APIS.common[URLS.getTest]({ params: { search: 'xxx' } });
  // 演示 post
  APIS.common[URLS.postTest]({ data: { password: 'xxx', username: 'artsmp' } });
</script>
```

### 图标使用

该模板支持三种图标使用方式：

- `unocss`：该项目默认已经集成了 `@iconify/json`，所以 [icones](https://icones.js.org/) 上的所有图标皆可使用。
- `naive-ui`：请直接阅读 naive-ui 的 [文档](https://www.naiveui.com/zh-CN/os-theme/components/icon)。
- `svg-icon`

此处演示三种使用方式：

```html
<NSpace>
  <div class="i-material-symbols:360"></div>
  <!-- 针对 naive 方式，该项目仅安装了这个图标包（@vicons/antd），若有需要请自行安装其他图包。 -->
  <NIcon> <UploadOutlined /> </NIcon>
  <!-- 请注意：需要带上路径前缀 假设 chart 图标在 icons/sidebar/xxx/chart.svg，则他的名字为 sidebar-xxx-chart -->
  <GpSvgIcon name="sidebar-chart" />
  这是蚊子
</NSpace>
```

### 环境变量使用

环境变量文件统一放在 `/env/` 下， `.env` 文件存放该项目所有提供的变量，你也可以新增，使用上主要是运行开发或者构建命令时带上 `--mode [staging]` 这种方式，若对应文件未指定，则会使用 `.env` 这个文件中的变量值。

```bash
  env
├──  .env               # 基础，优先级最低
├──  .env.development   # 开发环境使用
├──  .env.production    # 生产环境使用
└──  .env.staging       # 测试环境使用
```

项目会自动扫描该文件并生成对应的类型到 `/types/env.d.ts` 中，所以该文件是自动生成的，请不要在此定义一些全局类型。
以下是目前已存在的环境变量的解释：

```bash
# 基本不变
VITE_PUBLIC_PATH=./

# VITE_USER_API_URL 为用户中心后台接口地址（用于获取动态路由、用户信息等）
# VITE_LOGIN_URL 为登录失效页面跳转地址

# 生产地址使用相对路径，除古珀

# 长兴、柯桥、凉山州、玉环
# VITE_USER_API_URL=/bmo-auth-api/api
# VITE_LOGIN_URL=/bmo-auth-pc/#/login

# 丽水
# VITE_USER_API_URL=/bmo-auth-api-lishui/api
# VITE_LOGIN_URL=/bmo-auth-pc-lishui/#/login

# 萧山
# VITE_USER_API_URL=/bmo-auth-api-xiaoshan/api
# VITE_LOGIN_URL=/bmo-auth-pc-xiaoshan/#/login

# 诸暨
# VITE_USER_API_URL=/bmo-auth-api-zhuji/api
# VITE_LOGIN_URL=/bmo-auth-pc-zhuji/#/login

# 古珀
# VITE_USER_API_URL=https://apps.group-ds.com/bmo-auth-api/api
# VITE_LOGIN_URL=https://release.group-ds.com/bmo-auth-pc-xiaoshan/#/login

# 测试环境
VITE_USER_API_URL=https://uat-api.group-ds.com/bmo-auth-api/api
VITE_LOGIN_URL=https://demo.group-ds.com/bmo-auth-pc/#/login

# 用户中心走本地数据
VITE_USE_MOCK_DATA=false
# OSS 流水线标签
OSS_TAG=release-k8s-0000-v
# 是否要支持 markdown 文件渲染
VITE_APP_MARKDOWN=true
# 后端接口地址
VITE_APP_API_URL=http://10.123.234.102:10087
```

### 路由 meta 使用

本项目定义了如下的路由 `meta` 字段，若要添加新的字段，请到 `/types/router.d.ts` 文件中新增：

```ts
import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    /** 菜单图标：例如 sidebar-dashboard -> assets/icons/sidebar/dashboard.svg */
    icon?: string;
    /** 页面标题(菜单项和标签页标题) */
    title?: string;
    /** 是否进行页面保活，如果是数组，只有在进入指定页面才会进行保活操作 */
    keepAlive?: boolean | string[];
    /** 是否在 标签栏 隐藏 */
    hideInTab?: boolean;
    /** 是否在 菜单栏 显示徽标数 */
    badge?: number;
    /** 是否在菜单栏中隐藏：比如详情页 */
    hideInMenu?: boolean;
    /** 作为父路由是否本身拥有界面 */
    isPage?: boolean;
    /** 默认采取 mock -> router -> 第一项作为首页，这个就是为了支持你自定义首页而不是默认第一项 */
    isIndex?: boolean;
  }
}

// isIndex 相关逻辑（permission.ts)：返回登录成功后前往的页面地址
const indexPagePath =
  flatMenuList.value.find((route) => route.meta?.isIndex && route.component)?.path ??
  (menuList.value[0]?.children?.[0]?.path || menuList.value[0]?.path || otherPagePath || '/');
```

> 注意路由保活请使用 `defineOptions` 进行路由名称（组件名）定义，路由名称解析 `mock.json` 时
>
> 被定义为如下的转换： `Demo/NestIsPage/Page1/Detail/index.vue -> Demo.NestIsPage.Page1.Detail`
