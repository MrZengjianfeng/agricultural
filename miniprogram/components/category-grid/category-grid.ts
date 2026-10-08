/**
 * 首页分类八宫格。
 * 固定四列，图标为圆形图片，下方是分类名。
 *
 * 属性：
 * - categories 分类列表，项需包含 id、name、image
 *
 * 事件：
 * - select 点击某个分类时触发，detail.item 为该分类
 */
Component({
  properties: {
    /** 分类入口数据，按展示顺序排列。 */
    categories: {
      type: Array,
      value: [],
    },
  },
  methods: {
    /**
     * 点击一个分类图标。
     * @param e 点击事件，dataset.index 为分类在列表中的下标
     */
    onTap(e: WechatMiniprogram.TouchEvent) {
      const index = Number(e.currentTarget.dataset.index)
      const categories = this.properties.categories as Array<Record<string, string>>
      const item = categories[index]
      if (item) {
        this.triggerEvent('select', { item })
      }
    },
  },
})
