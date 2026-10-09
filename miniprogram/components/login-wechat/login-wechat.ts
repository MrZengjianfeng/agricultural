/**
 * 微信一键登录按钮。
 * 灰绿色胶囊，左边是两只白色对话气泡，右边是按钮文案。
 * 协议未勾选时不弹授权。勾选后先向微信要头像昵称，同意后再把 userInfo 交给页面。
 * wx.login 和进首页仍由页面决定。getUserProfile 必须留在这次点击里，不能挪到页面的异步回调。
 *
 * 属性：
 * - label 按钮文案
 * - agreed 协议是否已勾选
 *
 * 事件：
 * - login 用户同意授权后触发，detail.userInfo 为头像昵称
 * - unagreed 协议未勾选时触发
 * - deny 用户拒绝授权时触发
 */
Component({
  properties: {
    /** 胶囊上的文案。 */
    label: {
      type: String,
      value: '微信一键登录',
    },
    /** 协议已勾选才允许弹出微信授权。 */
    agreed: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    /**
     * 点击胶囊。
     * 先拦住未勾选协议，再在这次点击里向微信要用户信息。
     */
    onTap() {
      if (!this.data.agreed) {
        this.triggerEvent('unagreed')
        return
      }
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: (res) => {
          this.triggerEvent('login', { userInfo: res.userInfo })
        },
        fail: () => {
          this.triggerEvent('deny')
        },
      })
    },
  },
})
