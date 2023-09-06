import { makeRequest } from './request';
import type { RequestConfig } from './types';

export { makeRequest as request } from './request';

export const get = <Res = any, Params = any>(url: string, otherConfigs?: Partial<RequestConfig>) => {
  return makeRequest<Res, Params>({
    method: 'get',
    url,
    ...otherConfigs
  });
};

export const post = <Res = any, Data = any>(
  url: string,
  otherConfigs?: Partial<Omit<RequestConfig<Data>, 'params'>> & { params?: any }
) => {
  return makeRequest<Res, undefined, Data>({
    method: 'post',
    url,
    ...otherConfigs
  });
};
