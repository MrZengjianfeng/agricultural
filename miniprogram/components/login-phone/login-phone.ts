/**
 * 手机号登录入口。
 * 设计稿里它不是胶囊，是主按钮下面居中的一行深绿文字。
 * 组件不弹手机号输入，点击只抛 login，页面决定提示还是跳转。
 *
 * 属性：
 * - label 入口文案
 *
 * 事件：
 * - login 点击文字时触发，不带 detail
 */
Component({
  properties: {
    /** 文字入口的文案。 */
    label: {
      type: String,
      value: '手机号登录',
    },
  },
  methods: {
    /**
     * 点击文字入口。
     * 只通知页面。协议没勾选时也照样抛出，由页面统一拦。
     */
    onTap() {
      this.triggerEvent('login')
    },
  },
})
