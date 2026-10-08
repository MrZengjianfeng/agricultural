/**
 * 购物车顶部的配送地址。
 * 展示「配送至 {{address}}」，本身不修改地址。
 *
 * 属性：
 * - address 收货人和地区，例如「杭州·西湖 张先生」
 *
 * 事件：
 * - pick 点击整条地址时触发，页面负责弹出可选地址
 */
Component({
  properties: {
    /** 当前配送地址，不含「配送至」三个字，模板会自己补上。 */
    address: {
      type: String,
      value: '',
    },
  },
  methods: {
    /**
     * 点击地址条。
     * 组件只抛出 pick，选中结果由页面写回 address。
     */
    onTap() {
      this.triggerEvent('pick')
    },
  },
})
