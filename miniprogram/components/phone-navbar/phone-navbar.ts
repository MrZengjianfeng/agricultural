import navLayout from '../../behaviors/nav-layout'

/**
 * 手机号登录顶栏。
 * 左侧是返回箭头，中间是「手机号登录」。
 * 状态栏和右上角微信胶囊由系统绘制，组件用 nav-layout 把这一行让到胶囊下面。
 * 标题相对整行居中，不跟着左侧箭头走偏。
 *
 * 属性：
 * - title 中间标题
 *
 * 事件：
 * - back 点击返回箭头时触发。页面决定后退还是回到微信登录
 */
Component({
  behaviors: [navLayout],
  properties: {
    /** 居中的深绿色标题。 */
    title: {
      type: String,
      value: '手机号登录',
    },
  },
  methods: {
    /**
     * 点击返回箭头。
     * 组件不调用 navigateBack，避免和页面的兜底跳转各走各的。
     */
    onBack() {
      this.triggerEvent('back')
    },
  },
})
