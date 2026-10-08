/**
 * 优惠券、积分、收藏。
 * 三项横排，中间用短竖线隔开。数字是绿色，说明是灰色。
 *
 * 属性：
 * - items 数据项。每项需要 key、value、label
 *
 * 事件：
 * - select 点击某一项时触发，detail.key 和 detail.label 用来区分点的是哪一项
 */
Component({
  properties: {
    /** 从左到右的数据项。 */
    items: {
      type: Array,
      value: [],
    },
  },
  methods: {
    /**
     * 点击一项数据。
     * 组件不跳转，把 key 和 label 交给页面。
     * @param e 点击事件，dataset.key、dataset.label 来自当前项
     */
    onTap(e: WechatMiniprogram.TouchEvent) {
      const key = String(e.currentTarget.dataset.key || '')
      const label = String(e.currentTarget.dataset.label || '')
      if (!key) {
        return
      }
      this.triggerEvent('select', { key, label })
    },
  },
})
