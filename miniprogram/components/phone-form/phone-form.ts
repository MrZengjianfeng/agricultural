/**
 * 只留下数字，并截到指定长度。
 * 系统数字键盘偶发带出小数点或空格，这里再滤一次。
 * @param raw 输入框当前内容
 * @param max 最多保留几位
 */
function digits(raw: string, max: number) {
  return String(raw || '').replace(/\D/g, '').slice(0, max)
}

/**
 * 手机号登录的白卡片。
 * 第一行是区号和手机号，第二行是验证码和获取按钮，中间一条浅分割线。
 * 组件只整理输入并抛事件，不判断手机号对不对，也不启动倒计时。
 *
 * 属性：
 * - phone 已经输入的手机号，只含数字
 * - code 已经输入的验证码
 * - sendLabel 右侧按钮文案，倒计时中由页面改成秒数
 *
 * 事件：
 * - phoneinput 手机号变化，detail.value 为最多 11 位数字
 * - codeinput 验证码变化，detail.value 为最多 4 位数字
 * - send 点击获取验证码，不带 detail
 */
Component({
  properties: {

    /** 手机号。页面持有，输入后原样传回来。 */
    phone: {
      type: String,
      value: '',
    },
    /** 验证码。页面持有。 */
    code: {
      type: String,
      value: '',
    },
    /** 获取验证码按钮上的文字。 */
    sendLabel: {
      type: String,
      value: '',
    },
  },
  methods: {
    /**
     * 手机号输入。
     * 滤成数字后交给页面，并 return 同一串，避免第十二位还留在输入框里。
     * @param e 输入事件，detail.value 为当前文本
     */
    onPhone(e: WechatMiniprogram.Input) {
      const value = digits(e.detail.value, 11)
      this.triggerEvent('phoneinput', { value })
      return value
    },
    /**
     * 验证码输入。
     * 只留六位数字。
     * @param e 输入事件，detail.value 为当前文本
     */
    onCode(e: WechatMiniprogram.Input) {
      const value = digits(e.detail.value, 6)
      this.triggerEvent('codeinput', { value })
      return value
    },
    /**
     * 点击获取验证码。
     * 倒计时中也照样抛出，由页面决定要不要重新计时。
     */
    handleSendCode() {
      this.triggerEvent('handleSendCode')
    },
  },
})
