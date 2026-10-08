/**
 * 返回微信登录。
 * 主按钮下面居中的一行深绿色文字，不是胶囊。
 * 组件不跳转，点击只抛 back，页面和顶栏箭头走同一条返回。
 *
 * 属性：
 * - label 文字内容
 *
 * 事件：
 * - back 点击文字时触发，不带 detail
 */
Component({
  properties: {
    /** 居中的文字入口。 */
    label: {
      type: String,
      value: '返回微信登录',
    },
  },
  methods: {
    /**
     * 点击文字。
     * 只通知页面。
     */
    onTap() {
      this.triggerEvent('back')
    },
  },
})
