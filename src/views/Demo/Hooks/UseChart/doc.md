### `useChart` 使用文档

> 支持自动挂载到对应 dom 上，而无需关心 dom 元素何时被初始化。支持对亮暗色主题切换时自动切换主题效果。
> 支持图表全屏切换功能。

#### 函数入参

-   `wrapper: ShallowRef<HTMLElement | undefined>`：被 `echarts` 实例挂载的元素。
-   `options?: UseEchartsOption`：配置对象。
    -   `fullScreenEl?: ShallowRef<HTMLElement | undefined>`：要全屏的元素。
    -   `resizeOpts?: ResizeOpts`： echa`rts 实例调用 `resize` 方法时，所需的配置对象。

#### 使用方式

```ts
// 全屏元素
const card = shallowRef();
// 图表挂载的 dom 对象
const wrapper = shallowRef<HTMLElement>();
// 初始化
const { setOptions, fullscreen } = useChart(wrapper, { fullScreenEl: card });
// 传入配置：等同于 echarts 实例.setOption，只不过多了一步轮询去查看 dom 是否初始化完成以及 chart 实例是否初始化完成
setOptions({ ...配置对象 });
```
