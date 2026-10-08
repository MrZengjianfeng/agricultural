/**
 * 登录页底部的协议区。
 * 第一行是空心圆和「我已阅读并同意《用户协议》和《隐私政策》」。
 * 书名号是绿色，可以单独点开；其余文字和圆点一起切换勾选。
 * 第二行是灰色说明，提醒登录会授权微信头像和昵称。
 * 组件不改 checked，页面收到 toggle 后再把新状态传回来。
 *
 * 属性：
 * - checked 当前是否勾选
 * - lead 勾选圆右边的普通文字
 * - agreement 用户协议书名号
 * - join 两个书名号之间的连接词
 * - privacy 隐私政策书名号
 * - hint 第二行灰色说明
 *
 * 事件：
 * - toggle 点击圆点或普通文字时触发，不带 detail
 * - open 点击书名号时触发，detail.key 为 agreement 或 privacy
 */
Component({
  properties: {
    /** 为 true 时圆点填上灰绿并画出对勾。 */
    checked: {
      type: Boolean,
      value: false,
    },
    /** 「我已阅读并同意」。 */
    lead: {
      type: String,
      value: '我已阅读并同意',
    },
    /** 《用户协议》。 */
    agreement: {
      type: String,
      value: '《用户协议》',
    },
    /** 两个链接之间的「和」。 */
    join: {
      type: String,
      value: '和',
    },
    /** 《隐私政策》。 */
    privacy: {
      type: String,
      value: '《隐私政策》',
    },
    /**
     * 协议行下方的授权说明。
     * 传空字符串时不渲染这一行。手机号登录的设计稿没有这段。
     */
    hint: {
      type: String,
      value: '登录即表示同意授权获取微信头像与昵称',
    },
  },
  methods: {
    /**
     * 点击勾选圆或普通文字。
     * 不在这里改 checked，避免和页面上的状态各算各的。
     */
    onToggle() {
      this.triggerEvent('toggle')
    },
    /**
     * 点击《用户协议》或《隐私政策》。
     * 用 catchtap，避免再冒泡去切换勾选。
     * @param e 点击事件，dataset.key 区分两份文档
     */
    onOpen(e: WechatMiniprogram.TouchEvent) {
      const key = String(e.currentTarget.dataset.key || '')
      if (key !== 'agreement' && key !== 'privacy') {
        return
      }
      this.triggerEvent('open', { key })
    },
  },
})
