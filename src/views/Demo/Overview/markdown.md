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
  userInfo = '/api/user/{id}'
}

export default {
  /** 演示 get 分页请求 */
  [URL.tableList]: get<PageRes<TableItem>, PageParams<TagTbBindListParams>>(URL.tableList),
  /** 演示 get 普通请求 */
  [URL.getTest]: get<BaseRes<TableItem>, { search?: string; xx?: string }>(URL.getTest),
  /** 演示 post 请求 */
  [URL.postTest]: post<BaseRes<boolean>, { username: string; password: string }>(URL.postTest),
  /** 此处演示路径参数的请求方式，此种写法等同于改行下的注释 */
  [URL.userInfo]: pathArgGet<BaseRes<TableItem>, URL.userInfo>(URL.userInfo)
  // [URL.userInfo]: request<BaseRes<TableItem>, undefined, undefined, URL.userInfo>({ url: URL.userInfo })
};
```

> 请注意，当使用该模板进行接口请求时，请先根据后端接口适配 `api/request/types.ts` 文件里的三个类型： `BaseRes`、`PageParams`、`PageRes`。

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
  <NIcon> <UploadOutlined /> </NIcon>
  <!-- 请注意：需要带上路径前缀 假设 chart 图标在 icons/sidebar/xxx/chart.svg，则他的名字为 sidebar-xxx-chart -->
  <GpSvgIcon name="sidebar-chart" />
  这是蚊子
</NSpace>
```
