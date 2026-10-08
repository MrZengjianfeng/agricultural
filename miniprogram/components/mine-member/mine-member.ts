/**
 * 农场直供会员开通条。
 * 浅草绿圆角条，左边两行字，右边白色胶囊按钮。
 * 组件只负责展示和抛出点击，不开通、不请求接口。
 *
 * 属性：
 * - title 主标题，默认「农场直供会员」
 * - subtitle 副标题，默认「每月领新鲜券」
 * - action 按钮文字，默认「去开通」
 *
 * 事件：
 * - open 点击「去开通」时触发
 */
Component({
  properties: {
    /** 左侧主标题。 */
    title: {
      type: String,
      value: '农场直供会员',
    },
    /** 主标题下面的小字。 */
    subtitle: {
      type: String,
      value: '每月领新鲜券',
    },
    /** 右侧按钮文字。 */
    action: {
      type: String,
      value: '去开通',
    },
  },
  methods: {
    /**
     * 点击去开通。
     * 确认弹窗由页面来做，组件不改会员状态。
     */
    onOpen() {
      this.triggerEvent('open')
    },
  },
})
