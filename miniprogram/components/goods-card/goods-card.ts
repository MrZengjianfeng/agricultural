/**
 * 商品卡片，供「今日鲜摘」和「农场直发」共用。
 *
 * 属性：
 * - item 商品对象。鲜摘卡片读取 name、price、originPrice、image、badge；
 *   农场卡片读取 name、price、origin、image
 * - layout 卡片版式：fresh 为上图下文的横滑卡，farm 为左图右文的双列卡
 *
 * 事件：
 * - select 点击卡片主体时触发，detail.item 为当前商品
 * - add 点击农场卡片的加号时触发，detail.item 为当前商品；该点击不会再冒泡成 select
 */
Component({
  properties: {
    /** 当前商品。字段含义由 layout 决定。 */
    item: {
      type: Object,
      value: {},
    },
    /**
     * 卡片版式。
     * fresh：图片在上，名称和价格在下。
     * farm：图片在左，名称、价格和加号在右。
     */
    layout: {
      type: String,
      value: 'fresh',
    },
  },
  methods: {
    /**
     * 点击卡片。
     * 把商品原样放进 select 事件，页面决定跳转或提示。
     */
    onTap() {
      this.triggerEvent('select', { item: this.properties.item })
    },
    /**
     * 点击加号。
     * 使用 catchtap 拦住冒泡，避免同一次点击再触发 select。
     */
    onAdd() {
      this.triggerEvent('add', { item: this.properties.item })
    },
  },
})
