/**
 * 「农场直发」区块。
 * 标题右侧是「查看全部」，商品按两列排布，每张卡片可单独加购。
 *
 * 属性：
 * - title 区块标题，默认「农场直发」
 * - goods 农场商品列表，项需包含 id、name、price、origin、image
 *
 * 事件：
 * - more 点击「查看全部」时触发
 * - select 点击商品卡片时触发，detail.item 为该商品
 * - add 点击加号时触发，detail.item 为该商品
 */
Component({
  properties: {
    /** 区块标题。 */
    title: {
      type: String,
      value: '农场直发',
    },
    /** 双列展示的商品。 */
    goods: {
      type: Array,
      value: [],
    },
  },
  methods: {
    /**
     * 点击「查看全部」。
     * 组件不负责跳转，由页面监听 more 决定去向。
     */
    onMore() {
      this.triggerEvent('more')
    },
    /**
     * 转发商品卡片点击。
     * @param e goods-card 的 select 事件
     */
    onSelect(e: WechatMiniprogram.CustomEvent) {
      this.triggerEvent('select', e.detail)
    },
    /**
     * 转发加购点击。
     * @param e goods-card 的 add 事件
     */
    onAdd(e: WechatMiniprogram.CustomEvent) {
      this.triggerEvent('add', e.detail)
    },
  },
})
