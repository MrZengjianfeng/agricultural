import navLayout from '../../behaviors/nav-layout'

/**
 * 首页自定义导航栏。
 * 左侧是配送地址，中间是品牌名；右侧宽度交给 nav-layout，用来避开微信胶囊。
 * 状态栏时间、信号和胶囊本身由微信绘制，组件不重复画。
 *
 * 属性：
 * - title 居中的品牌名，默认「田野鲜生」
 * - location 配送地区，展示为「配送至 {{location}}」
 *
 * 事件：
 * - locationtap 点击左侧地址时触发，页面负责弹出地址列表
 */
Component({
  behaviors: [navLayout],
  properties: {
    /** 导航中间的品牌名称。 */
    title: {
      type: String,
      value: '田野鲜生',
    },
    /** 当前配送地址，例如「杭州·西湖」。 */
    location: {
      type: String,
      value: '杭州·西湖',
    },
  },
  methods: {
    /**
     * 点击配送地址。
     * 组件只抛出 locationtap，不在内部修改地址。
     */
    onLocation() {
      this.triggerEvent('locationtap')
    },
  },
})
