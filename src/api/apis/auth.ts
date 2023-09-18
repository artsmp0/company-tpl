import type { PermissionData } from '@/stores/permission';
import { get } from '../request';
import type { BaseRes } from '../request/types';
const userApiUrl = import.meta.env.VITE_USER_API_URL;

export type Org = {
  id: number;
  name: string;
};

export const enum URL {
  token = '/open/user/tokenDetail',
  routes = '/open/permission/router',
  org = '/org/user/system/org',
  logout = '/apiUser/logout',
}

export default {
  [URL.token]: get(URL.token, {
    baseURL: userApiUrl,
    isAuthApi: true,
  }),
  [URL.routes]: get<BaseRes<PermissionData>, { system_code: string; org_id: string | number }>(URL.routes, {
    baseURL: userApiUrl,
    isAuthApi: true,
  }),
  [URL.org]: get<BaseRes<Org[]>, { system_code: string }>(URL.org, {
    baseURL: userApiUrl,
    isAuthApi: true,
  }),
  [URL.logout]: get(URL.logout, {
    baseURL: userApiUrl,
    isAuthApi: true,
  }),
};
