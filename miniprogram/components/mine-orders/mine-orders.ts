/**
 * 我的订单。
 * 标题在左，「查看全部」在右，下面一排五个状态入口。
 * 角标大于 0 才显示，待付款在设计稿里是红色数字 1。
 *
 * 属性：
 * - title 卡片标题，默认「我的订单」
 * - moreText 右上角文字，默认「查看全部」
 * - items 入口列表。每项需要 key、icon、label、badge
 *
 * 事件：
 * - all 点击「查看全部」时触发
 * - select 点击某个状态时触发，detail.key 和 detail.label 为该项
 */
Component({
  properties: {
    /** 左侧标题。 */
    title: {
      type: String,
      value: '我的订单',
    },
    /** 右上角入口文字。 */
    moreText: {
      type: String,
      value: '查看全部',
    },
    /** 五个订单状态。 */
    items: {
      type: Array,
      value: [],
    },
  },
  methods: {
    /**
     * 点击查看全部。
     * 组件不负责跳进订单列表。
     */
    onAll() {
      this.triggerEvent('all')
    },
    /**
     * 点击一个订单状态。
     * @param e 点击事件，dataset.key、dataset.label 来自当前入口
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
