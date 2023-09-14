import type { EChartsType, ResizeOpts, EChartsOption } from 'echarts';
import type { Ref, ShallowRef } from 'vue';
import echarts from '@/utils/echarts';
import { tryOnBeforeUnmount, useDebounceFn, useFullscreen, useTimeoutFn, useWindowSize } from '@vueuse/core';
import { isDark } from '.';

const defaultResizeOpts: ResizeOpts = {
  animation: {
    duration: 300,
    easing: 'linear',
  },
};

type UseEchartsOption = {
  resizeOpts?: ResizeOpts;
  theme?: 'light' | 'dark' | 'default';
  fullScreenEl?: ShallowRef<HTMLElement | undefined>;
};

export function useChart(
  wrapper: ShallowRef<HTMLElement | undefined>,
  options: UseEchartsOption = { theme: 'default' }
) {
  const chartInstance = shallowRef<undefined | EChartsType>();
  let resizeObserver: ResizeObserver | undefined;
  const cacheOption = shallowRef<EChartsOption>();
  const { height } = useWindowSize();
  let toggle: (() => Promise<void>) | undefined = undefined;
  let isFullscreen: Ref<boolean> | undefined = undefined;
  if (options?.fullScreenEl) {
    const fullScreenEl = options?.fullScreenEl;
    const fs = useFullscreen(fullScreenEl);
    toggle = fs.toggle;
    isFullscreen = fs.isFullscreen;
    const originHeight = ref('');
    const stop = watch(isFullscreen, async (v) => {
      // 没有全屏元素无需改变图表尺寸
      if (!fullScreenEl?.value) {
        await nextTick();
        stop();
        return;
      }
      if (!v) {
        wrapper.value!.style.height = originHeight.value;
        return;
      }
      originHeight.value = getComputedStyle(wrapper.value!).height;
      wrapper.value!.style.height = height.value + 'px';
    });
  }

  // 为了解决 vif 切换 dom 变换导致不重新渲染的问题
  watch(wrapper, (v) => {
    if (!v) return;
    reRender();
  });

  function reRender() {
    chartInstance.value?.dispose();
    chartInstance.value = undefined;
    setOptions(cacheOption.value!);
  }

  const theme = computed(() => (!options.theme ? (isDark.value ? 'dark' : 'light') : options.theme));

  const getOption = (): EChartsOption => {
    if (theme.value === 'dark') {
      return {
        ...cacheOption.value!,
        backgroundColor: 'transparent',
      };
    }
    return cacheOption.value!;
  };

  watch(theme, () => {
    reRender();
  });

  function resize() {
    nextTick(() => {
      chartInstance.value?.resize(options?.resizeOpts || defaultResizeOpts);
    });
  }

  function initChart() {
    const el = unref(wrapper);
    if (!el) return;
    chartInstance.value = echarts.init(el, theme.value) as unknown as EChartsType;
    resizeObserver = new ResizeObserver(useDebounceFn(resize, 100, { maxWait: 500 }));
    resizeObserver.observe(el);
    resizeObserver.observe(document.body);
  }

  function setOptions(option: EChartsOption, clear = true) {
    const el = unref(wrapper);
    cacheOption.value = option;
    if (!el) {
      useTimeoutFn(() => {
        setOptions(option, clear);
      }, 30);
      return;
    }
    useTimeoutFn(() => {
      if (!chartInstance.value) {
        initChart();
        if (!chartInstance.value) return;
      }
      clear && chartInstance.value.clear();
      chartInstance.value.setOption(getOption());
    }, 30);
  }

  tryOnBeforeUnmount(() => {
    const chartIns = unref(chartInstance);
    if (!chartIns) return;
    chartIns.dispose();
    chartInstance.value = undefined;
    wrapper.value && resizeObserver?.unobserve(wrapper.value);
    resizeObserver?.disconnect();
  });

  return {
    chartInstance,
    setOptions,
    resize,
    fullscreen: {
      isFullscreen,
      toggle,
    },
  };
}
