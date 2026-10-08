/**
 * 微信一键登录按钮。
 * 灰绿色胶囊，左边是两只白色对话气泡，右边是按钮文案。
 * 组件不判断协议有没有勾选，也不调用 wx.login，点下去只抛 login。
 * 是否允许登录、登录成功后去哪一页，由页面决定。
 *
 * 属性：
 * - label 按钮文案
 *
 * 事件：
 * - login 点击按钮时触发，不带 detail
 */
Component({
  properties: {
    /** 胶囊上的文案。 */
    label: {
      type: String,
      value: '微信一键登录',
    },
  },
  methods: {
    /**
     * 点击胶囊。
     * 只通知页面，协议校验和 wx.login 都留在页面里。
     */
    onTap() {
      this.triggerEvent('login')
    },
  },
})
