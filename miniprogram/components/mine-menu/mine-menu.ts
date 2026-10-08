/**
 * 个人中心菜单。
 * 白卡片里从上到下四行：收货地址、我的收藏、联系客服、设置。
 * 每行左侧是绿色图标，右侧是灰色箭头。最后一行下面不再画分割线。
 *
 * 属性：
 * - items 菜单行。每项需要 key、icon、label
 *
 * 事件：
 * - select 点击一行时触发，detail.key 和 detail.label 为该行
 */
Component({
  properties: {
    /** 菜单行，顺序由页面传入。 */
    items: {
      type: Array,
      value: [],
    },
  },
  methods: {
    /**
     * 点击一行菜单。
     * 地址、客服、设置的具体反馈由页面决定。
     * @param e 点击事件，dataset.key、dataset.label 来自当前行
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
