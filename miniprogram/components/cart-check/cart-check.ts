/**
 * 购物车里的圆形勾选。
 * 商品卡片左上角和结算栏的「全选」共用这一颗。
 * 组件不修改 checked，父级收到 change 后再决定勾上还是取消。
 *
 * 属性：
 * - checked 为 true 时绿底白勾，为 false 时空心圆
 *
 * 事件：
 * - change 点击时触发，不带 detail。使用 catchtap，不会再冒泡成外层点击
 */
Component({
  properties: {
    /** 当前是否勾选。 */
    checked: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    /**
     * 点击圆点。
     * 只通知父级，选中态由父级把新的 checked 传回来。
     */
    onTap() {
      this.triggerEvent('change')
    },
  },
})
