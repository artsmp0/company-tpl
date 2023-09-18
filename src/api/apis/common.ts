import { get, pathArgGet, post } from '../request';
import type { BaseRes, PageParams, PageRes } from '../request/types';
import type { TableItem, TagTbBindListParams } from './types';

export const enum URLS {
  getTest = '/api/get',
  postTest = '/api/post',
  tableList = '/tag/tb/bind/list',
  userInfo = '/api/user/{id}',
}

export default {
  /** 演示 get 分页请求 */
  [URLS.tableList]: get<PageRes<TableItem>, PageParams<TagTbBindListParams>>(URLS.tableList),
  /** 演示 get 普通请求 */
  [URLS.getTest]: get<BaseRes<TableItem>, { search?: string; xx?: string }>(URLS.getTest),
  /** 演示 post 请求 */
  [URLS.postTest]: post<BaseRes<boolean>, { username: string; password: string }>(URLS.postTest),
  /** 此处演示路径参数的请求方式，此种写法等同于改行下的注释 */
  [URLS.userInfo]: pathArgGet<BaseRes<TableItem>, URLS.userInfo>(URLS.userInfo),
  // [URL.userInfo]: request<BaseRes<TableItem>, undefined, undefined, URL.userInfo>({ url: URL.userInfo })
};
