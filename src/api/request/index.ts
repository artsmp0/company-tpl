/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeRequest } from './request';
import type { RequestConfig } from './types';

export { makeRequest as request } from './request';

/** query 传参 get */
export const get = <Res = any, Params = any>(url: string, otherConfigs?: Partial<RequestConfig>) => {
  return makeRequest<Res, Params>({
    method: 'get',
    url,
    ...otherConfigs,
  });
};

/** 路径 get 请求 */
export const pathArgGet = <Res = any, Params extends string = string>(
  url: string,
  otherConfigs?: Partial<Omit<RequestConfig, 'params' | 'data' | 'args'>>
) => {
  return makeRequest<Res, undefined, undefined, Params>({
    method: 'get',
    url,
    ...otherConfigs,
  });
};

/** post 请求 */
export const post = <Res = any, Data = any>(
  url: string,
  otherConfigs?: Partial<Omit<RequestConfig<Data>, 'params'>> & { params?: any }
) => {
  return makeRequest<Res, undefined, Data>({
    method: 'post',
    url,
    ...otherConfigs,
  });
};
