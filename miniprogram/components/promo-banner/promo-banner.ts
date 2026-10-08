/**
 * 首页促销轮播。
 * 自动循环播放，左下角叠标题、副标题和按钮，图片下方用圆点表示当前项。
 *
 * 属性：
 * - banners 轮播列表，项需包含 id、title、subtitle、action、image
 *
 * 事件：
 * - action 点击某一帧时触发，detail.item 为该帧的完整数据
 */
Component({
  properties: {
    /** 轮播数据。空数组时不渲染内容。 */
    banners: {
      type: Array,
      value: [],
    },
  },
  data: {
    /** 当前帧下标，用来点亮对应圆点。 */
    current: 0,
  },
  methods: {
    /**
     * 轮播切换后同步圆点。
     * @param e swiper change 事件，detail.current 是新的下标
     */
    onChange(e: { detail: { current: number } }) {
      this.setData({ current: e.detail.current })
    },
    /**
     * 点击当前轮播卡片。
     * 用 data-index 取回对应项，再通过 action 事件交给页面。
     * @param e 点击事件，dataset.index 为轮播下标
     */
    onTap(e: WechatMiniprogram.TouchEvent) {
      const index = Number(e.currentTarget.dataset.index)
      const banners = this.properties.banners as Array<Record<string, string>>
      const item = banners[index]
      if (item) {
        this.triggerEvent('action', { item })
      }
    },
  },
})
