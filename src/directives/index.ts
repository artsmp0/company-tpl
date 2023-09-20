import type { Plugin } from 'vue';
import { createLoadingDirective } from './loading';

export const directivePlugin: Plugin = app => {
    app.directive('loading', createLoadingDirective());
};
