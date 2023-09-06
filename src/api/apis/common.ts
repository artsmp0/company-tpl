import { get, post } from '../request';
import type { BaseRes, PageParams, PageRes } from '../request/types';
import type { TableItem, TagTbBindListParams } from './types';

export const enum URL {
  getTest = '/api/get',
  postTest = '/api/post',
  tableList = '/tag/tb/bind/list'
}

export default {
  [URL.tableList]: get<PageRes<TableItem>, PageParams<TagTbBindListParams>>(URL.tableList),
  [URL.getTest]: get<{ search?: string; xx?: string }, PageRes<TableItem>>(URL.getTest),
  [URL.postTest]: post<{ username: string; password: string }, BaseRes<boolean>>(URL.postTest)
};
