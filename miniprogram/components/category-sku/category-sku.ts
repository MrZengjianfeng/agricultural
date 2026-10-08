/**
 * 分类页右侧的单行商品卡。
 * 左图右文：名称、规格在上，价格和加号在下，高度与商品图对齐。
 *
 * 属性：
 * - item 商品对象，需包含 id、name、spec、price、image
 *
 * 事件：
 * - select 点击卡片主体时触发，detail.item 为当前商品
 * - add 点击右侧加号时触发，detail.item 为当前商品。
 *   加号使用 catchtap，同一次点击不会再冒泡成 select
 */
Component({
  properties: {
    /** 当前商品。价格不带人民币符号，由模板补上 ¥。 */
    item: {
      type: Object,
      value: {},
    },
  },
  methods: {
    /**
     * 点击卡片主体。
     * 页面决定是提示还是进入详情，组件不直接跳转。
     */
    onTap() {
      this.triggerEvent('select', { item: this.properties.item })
    },
    /**
     * 点击加号。
     * 与卡片点击分开抛出，方便页面只在加号上改购物车件数。
     */
    onAdd() {
      this.triggerEvent('add', { item: this.properties.item })
    },
  },
})
