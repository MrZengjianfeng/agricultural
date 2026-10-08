/**
 * 购物车里的一行商品。
 * 左边是圆角商品图，勾选圆点压在图片左上角；
 * 右边上方是名称和产地，下方是绿色单价和数量步进器。
 *
 * 属性：
 * - item 商品对象，需包含 id、name、origin、price、count、checked、image
 *
 * 事件：
 * - check 点击勾选圆点时触发，detail.id 为商品 id。组件不反转 checked
 * - count 件数变化时触发，detail.id 为商品 id，detail.count 为新件数
 */
Component({
  properties: {
    /** 当前这一行商品。单价不带人民币符号，模板补上 ¥。 */
    item: {
      type: Object,
      value: {},
    },
  },
  methods: {
    /**
     * 点击商品图上的勾选。
     * 把商品 id 交给页面，由页面决定勾上还是取消。
     */
    onCheck() {
      const item = this.properties.item as { id?: string }
      this.triggerEvent('check', { id: item.id || '' })
    },
    /**
     * 步进器件数变化。
     * 带上商品 id，页面按 id 更新对应那一行。
     * @param e cart-stepper 的 change 事件，detail.count 为新件数
     */
    onCount(e: WechatMiniprogram.CustomEvent<{ count: number }>) {
      const item = this.properties.item as { id?: string }
      this.triggerEvent('count', {
        id: item.id || '',
        count: e.detail.count,
      })
    },
  },
})
