import navLayout from '../../behaviors/nav-layout'

/**
 * 购物车自定义导航栏。
 * 左侧是「管理 / 完成」，中间是标题「购物车」。
 * 状态栏和右上角微信胶囊由系统绘制，组件用 nav-layout 把文字让开。
 *
 * 属性：
 * - managing 为 true 时左侧显示「完成」，否则显示「管理」
 *
 * 事件：
 * - manage 点击左侧文字时触发。页面负责切换编辑态
 */
Component({
  behaviors: [navLayout],
  properties: {
    /** 是否处于管理商品的编辑态。 */
    managing: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    /**
     * 点击管理或完成。
     * 组件不保存编辑态，只把切换交给页面。
     */
    onManage() {
      this.triggerEvent('manage')
    },
  },
})
