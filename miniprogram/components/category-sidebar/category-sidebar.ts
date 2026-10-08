/**
 * 分类页左侧菜单。
 * 纵向铺满父级高度，选中项白底、绿字，并在左缘画一条短绿条。
 * 条目少时均分高度，和设计稿一样顶到搜索框、落到导航上方；条目超出屏幕时可以滚动。
 *
 * 属性：
 * - categories 菜单项，每项需包含 id、name
 * - currentId 当前选中项的 id
 *
 * 事件：
 * - change 点中另一项时触发，detail.id 为分类 id，detail.name 为分类名。
 *   再次点中当前项不会触发。
 */
Component({
  properties: {
    /** 左侧分类，顺序与设计稿一致。 */
    categories: {
      type: Array,
      value: [],
    },
    /** 当前高亮分类的 id。 */
    currentId: {
      type: String,
      value: '',
    },
  },
  methods: {
    /**
     * 切换分类。
     * 没有 id、或点的就是当前项时直接返回，避免右侧列表无意义刷新。
     * @param e 点击事件，dataset.id 为分类 id
     */
    onTap(e: WechatMiniprogram.TouchEvent) {
      const id = String(e.currentTarget.dataset.id || '')
      if (!id || id === this.properties.currentId) {
        return
      }
      const categories = this.properties.categories as Array<{ id: string; name: string }>
      const item = categories.find((category) => category.id === id)
      if (!item) {
        return
      }
      this.triggerEvent('change', { id: item.id, name: item.name })
    },
  },
})
