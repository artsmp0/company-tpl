import { isDark } from '@/composables';
import { DARK_THEME_OVERRIDES, LIGHT_THEME_OVERRIDES } from '@/constants';
import { NSpin } from 'naive-ui';
import type { App, Directive } from 'vue';

export function createLoadingDirective(): Directive<HTMLDivElement, boolean> {
    let oDiv: HTMLDivElement;
    let app: App;
    const createLoading = (el: HTMLDivElement) => {
        app = createApp(NSpin, {
            themeOverrides: isDark.value ? DARK_THEME_OVERRIDES : LIGHT_THEME_OVERRIDES,
        });
        oDiv = document.createElement('div');

        oDiv.setAttribute(
            'style',
            ` background: rgba(237, 247, 242, 0.2);
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;`
        );

        el.classList.add('relative');
        app.mount(oDiv);
        el.appendChild(oDiv);
    };

    const removeLoading = (el: HTMLDivElement) => {
        el.classList.remove('relative');
        oDiv.remove();
    };
    return {
        mounted(el) {
            createLoading(el);
        },
        updated(el, binding) {
            removeLoading(el);
            if (binding.value === true) {
                createLoading(el);
            }
        },
        unmounted(el) {
            removeLoading(el);
        },
    };
}
