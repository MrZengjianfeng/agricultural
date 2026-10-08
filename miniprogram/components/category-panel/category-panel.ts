/**
 * 分类页右侧商品区。
 * 白底纵向滚动，按分组展示标题和商品行。分组数据由页面算好后传入，
 * 组件只负责展示，以及把卡片点击、加号点击原样转发给页面。
 *
 * 属性：
 * - groups 分组列表，每组含 id、name、goods
 * - anchor 要滚到的节点 id。页面切换分类时先清空再写入，才能重复滚回顶部
 *
 * 事件：
 * - select 点击商品行时触发，detail.item 为该商品
 * - add 点击加号时触发，detail.item 为该商品
 */
Component({
  properties: {
    /** 当前要展示的分组。为空时显示空态，而不是空白。 */
    groups: {
      type: Array,
      value: [],
    },
    /** scroll-into-view 的目标 id，对应某个分组节点的 id。 */
    anchor: {
      type: String,
      value: '',
    },
  },
  methods: {
    /**
     * 转发商品行点击。
     * @param e category-sku 的 select 事件，detail.item 为商品
     */
    onSelect(e: WechatMiniprogram.CustomEvent) {
      this.triggerEvent('select', e.detail)
    },
    /**
     * 转发加号点击。
     * @param e category-sku 的 add 事件，detail.item 为商品
     */
    onAdd(e: WechatMiniprogram.CustomEvent) {
      this.triggerEvent('add', e.detail)
    },
  },
})
