/* eslint-disable @typescript-eslint/no-explicit-any */
import { upperFirst } from 'lodash-unified';
import type { RenderFnParams } from '../types';
import * as Fields from './fields';

export function getWidget({ item, model }: RenderFnParams) {
    const renderTypeName = `render${upperFirst(item.type)}`;

    return (Fields as any)[renderTypeName]({ item, model });
}
