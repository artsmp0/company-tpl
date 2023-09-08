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
